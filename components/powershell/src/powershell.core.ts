import {
  ChildProcessWithoutNullStreams,
  spawn,
  spawnSync,
} from "child_process";
import { randomBytes } from "crypto";
import debug  from "debug";
import { existsSync, unlinkSync } from "fs";
import os from "os";
import { firstValueFrom, Observable, of, Subject, throwError } from "rxjs"
import {
  catchError,
  concatMap,
  filter,
  map,
  switchMap,
  take,
  tap,
  timeout,
} from "rxjs/operators";
import { Readable, Writable } from "stream";
import { Format, wrap } from "./wrapper";



interface Command {
  command: string;
  wrapped: string;
  subject: Subject<PowerShellStreams>;
  pid: number;
}

interface RawStreams {
  success: string;
  error: string;
  warning: string;
  verbose: string;
  debug: string;
  info: string;
  format: Format;
}

export interface PowerShellStreams {
  success: Array<any>;
  error: Array<any>;
  warning: Array<any>;
  verbose: Array<any>;
  debug: Array<any>;
  info: Array<any>;
}

function parseStream(stream: string, format: Format) {
  if (format != null) {
    return JSON.parse(stream);
  } else {
    return stream;
  }
}

class SubjectWithPromise<T> extends Subject<T> {
  async promise() {
    return firstValueFrom(this);
  }
}

class BufferReader extends Writable {
  public subject = new Subject<string>();
  private buffer: Buffer = Buffer.from("");
  private head: Buffer;
  private tail: Buffer;

  constructor(head: string, tail: string) {
    super();
    this.head = Buffer.from(head);
    this.tail = Buffer.from(tail);
  }

  extract(): Buffer {
    let head_idx = this.buffer.indexOf(this.head);
    let tail_idx = this.buffer.indexOf(this.tail);
    let data = this.buffer.slice(head_idx + this.head.length, tail_idx);
    this.buffer = this.buffer.slice(tail_idx + this.tail.length);
    return data;
  }

  _write(chunk: Buffer, encoding: string, callback: Function) {
    this.buffer = Buffer.concat([this.buffer, chunk]);
    while (this.buffer.includes(this.tail)) {
      const extracted = this.extract();
      this.subject.next(extracted.toString("utf8"));
    }
    callback();
  }
}

interface PowerShellOptions {
  tmp_dir?: string;
  exe_path?: string;
  timeout?: number; // milliseconds
}

export class PowerShell {
  public success$ = new Subject<Array<any>>();
  public error$ = new Subject<Array<any>>();
  public warning$ = new Subject<Array<any>>();
  public verbose$ = new Subject<Array<any>>();
  public debug$ = new Subject<Array<any>>();
  public info$ = new Subject<Array<any>>();
  // @ts-ignore
  private powershell: ChildProcessWithoutNullStreams;
  // @ts-ignore
  private stdin: Writable = null;
  // @ts-ignore
  private stdout: Readable = null;
  // @ts-ignore
  private stderr: Readable = null;

  // @ts-ignore
  private out$: Observable<PowerShellStreams>;

  private delimit_head = "F0ZU7Wm1p4"; // random string
  private delimit_tail = "AdBmCXEdsB"; // random string
  // @ts-ignore
  private out_verbose: string;
  // @ts-ignore
  private out_debug: string;

  private queue: Command[] = [];
  private tick$ = new Subject<void>();

  private tmp_dir: string = "";
  /* istanbul ignore next */
  private exe_path: string = "pwsh"; //(os.platform() === 'win32' ? 'powershell' : 'pwsh');
  private timeout = 6000000; // 100 minutes
  private log = debug("magicbox:core");

  constructor(options?: PowerShellOptions) {
    if (!!options) this.setOptions(options);

    this.info("[>] new instance");
    this.info("[>] tmp_dir: %s", this.tmp_dir);
    this.info("[>] exe_path: %s", this.exe_path);
    this.info("[>] timeout: %s", this.timeout);

    this.init();
  }

  info(...args: any[]) {
    console.log(...args);
    const x: any = debug(`fps:info [> ${this.powershell?.pid || -1}]`);
    x(...args);
  }

  error(...args: any[]) {
    console.log("ERROR", ...args);
    const x: any = debug(`fps:error [! ${this.powershell?.pid || -1}]`);
    x(...args);
  }

  setOptions(options: PowerShellOptions) {
    if (options.tmp_dir) this.tmp_dir = options.tmp_dir;
    if (options.exe_path) this.exe_path = options.exe_path;
    if (options.timeout) this.timeout = options.timeout;
  }

  private init() {
    this.info("[>] init");
    const prefix = randomBytes(8).toString("hex");
    this.out_verbose = `${this.tmp_dir}${prefix}_fps_verbose.tmp`;
    this.out_debug = `${this.tmp_dir}${prefix}_fps_debug.tmp`;
    this.initProcess();
    this.initReaders();
    this.initQueue();
  }

  private initProcess() {
    this.info("[>] init process");

    const args = ["-NoLogo", "-NoExit", "-Command", "-"];

    this.powershell = spawn(this.exe_path, args, { stdio: "pipe" });

    this.info("[>] pid: %s", this.powershell.pid);

    this.powershell.on("exit", () => {
      this.info("[>] child process emitted exit event");
      this.removeTempFile(this.out_verbose);
      this.removeTempFile(this.out_debug);
    });

    this.powershell.stdin.setDefaultEncoding("utf8");
    this.powershell.stdout.setEncoding("utf8");
    this.powershell.stderr.setEncoding("utf8");

    this.stdin = this.powershell.stdin;
    this.stdout = this.powershell.stdout;
    this.stderr = this.powershell.stderr;
  }

  private initReaders() {
    this.info("[>] init readers");

    const read_out = new BufferReader(this.delimit_head, this.delimit_tail);
    const read_err = new BufferReader(this.delimit_head, this.delimit_tail);
    this.stdout.pipe(read_out);
    this.stderr.pipe(read_err);

    this.out$ = read_out.subject.pipe(
      map((res: string) => {
        if (res === "null") {
          res =
            '{\n  "result": {\n    "success": "[null]",\n    "error": "[]",\n    "warning": "[]",\n    "verbose": "[]",\n    "debug": "[]",\n    "info": "[]",\n    "format": "json"\n  }\n}';
        }
        let result = JSON.parse(res).result as RawStreams;
        let success = parseStream(result.success, result.format);
        let error = parseStream(result.error, "json");
        let warning = parseStream(result.warning, "json");
        let verbose = parseStream(result.verbose, "string");
        let debug = parseStream(result.debug, "string");
        let info = parseStream(result.info, "json");

        if (success.length > 0) this.success$.next(success);
        if (error.length > 0) this.error$.next(error);
        if (warning.length > 0) this.warning$.next(warning);
        if (verbose.length > 0) this.verbose$.next(verbose);
        if (debug.length > 0) this.debug$.next(debug);
        if (info.length > 0) this.info$.next(info);

        return {
          success,
          error,
          warning,
          verbose,
          debug,
          info,
        };
      })
    );
  }

  private initQueue() {
    this.info("[>] init queue");

    // invokes a command
    // enforces timeout
    // errors calling subject
    const invoke = (command: Command) => {
      this.info("[>] invoking: %s", command.command);
      //            this.log.log(command.command);
      //            this.log.log(command.wrapped);

      this.stdin.write(Buffer.from(command.wrapped));
      return this.out$.pipe(
        take(1),
        timeout(this.timeout),
        map((result: any) => ({ command, result })),
        catchError((err: any) => {
          this.error("[X] error in pipe: %O", err);
          let error = err;
          if (error.name === "TimeoutError") {
            error = new Error(
              `Command timed out after ${this.timeout} milliseconds. Check the full-powershell docs for more information.`
            );
          }
          command.subject.error(error);
          return throwError(() => error);
        })
      );
    };

    // selects next command from queue
    const handler = () => {
      this.info("[>] %s pending", this.queue.length);
      return of(this.queue.shift() as Command).pipe(
        filter((command:any) => command !== undefined),
        switchMap((command: Command) => invoke(command as Command))
      );
    };

    // subscribes to tick to trigger check for next command
    // concatMaps command handler to enforce order
    let sub = this.tick$
      .pipe(
        tap((_: any) => this.info("[>] tick")),
        concatMap((_: any) => handler())
      )
      .subscribe({
        next: ({ command , result }) => {
          this.info("[>] complete: %s", command.command);
          command.subject.next(result); // emit from subject returned by call()
          command.subject.complete(); // complete subject returned by call()
          this.tick$.next(); // check for next command in queue
        },
        error: (err: any) => {
          this.info("[>] error...");
          sub.unsubscribe(); // clean up this observable chain
          this.destroy(); // kill old process
          this.init(); // start a new process
        },
      });

    this.tick$.next();
  }

  public call(command: string, format: Format = "json") {
    this.info("[>] command: %s", command);
    this.info("[>] format: %s", format);
    this.info("[>] pid: %s", this.powershell.pid);

    // subject to be returned form this method
    const subject = new SubjectWithPromise<PowerShellStreams>();

    // wrap the command in the serialisation script
    const wrapped: string = wrap(
      command,
      this.delimit_head,
      this.delimit_tail,
      this.out_verbose,
      this.out_debug,
      format
    );

    // queue the command context
    this.queue.push({
      command: command,
      wrapped: wrapped,
      subject: subject,
      pid: this.powershell.pid || 0,
    });

    // attempt to execute the command after this function has returned the subject
    queueMicrotask(() => this.tick$.next());

    // return the subject for this command
    return subject;
  }

  private removeTempFile(file: string) {
    if (existsSync(file)) {
      this.info("[>] removing temp file %s", file);
      unlinkSync(file);
      this.info("[>] removed temp file %s", file);
    }
  }

  public destroy() {
    this.info("[>] destroy called");
    this.stdin.destroy();
    return this.powershell.kill();
  }
}