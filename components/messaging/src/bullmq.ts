import { IResult } from "@koksmat/core";
import { Queue, Worker } from "bullmq";
import { v4 as uuidv4 } from "uuid";
import { IMessage, ISendOptions, IEnvelope } from "./IMessage";
import IORedis from "ioredis";
import debug from "debug";
import { MessageEvents } from "./MessageEvents";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


export class Messaging {
  private static _instance: Messaging;
  private events: MessageEvents = new MessageEvents();
  private _connectionString: string;

  constructor(connectionString : string) {
    this._connectionString = connectionString;
    this.events.receive(this.connect());
  }

  public static async getInstance(connectionString: string) {
    // open for connection pooling based on connectiong string differences
    if (!this._instance) {
      this._instance = new Messaging(connectionString);
     
    }
    return this._instance;
  }
   connect() {
    return {
      connection: new IORedis(this._connectionString),
      defaultJobOptions: { removeOnComplete: true },
    };
  }
  send(
    queueName: string,
    message: IMessage,
    options?: ISendOptions
  ): Promise<IResult<any>> {
    return new Promise(async (resolve, reject) => {
      const result: IResult<any> = {
        hasError: false,
      };
      const queue = new Queue(queueName, this.connect());
      const correlationId = uuidv4();
      var envelope: IEnvelope = {
        correlationId,
        route: message.route,
        method: message.method,
        payload: message.payload,
      };
      const log = debug("magicbox.messaging.send");
      // return a GUID
      const queueResult = await queue.add("jobname", envelope);
      const jobId = queueResult.id;
      log("jobId", jobId);

      this.events.subscribe(jobId as string, (message) => {
        log("message", message);
        this.events.unsubscribe(jobId as string);
        resolve(message);
      });
      // const channel = await connection.createChannel();

      const timeout =
        (options?.timeoutSeconds ? options.timeoutSeconds : 5) * 1000;

      setTimeout(async function () {
        result.hasError = true;
        result.errorMessage = "Timeout after " + timeout + " seconds";

        queue.close();
        resolve(result);
      }, timeout);
      await sleep(
        ((options?.timeoutSeconds ? options.timeoutSeconds : 5) + 1) * 1000
      );
    });
  }

  async receive(
    queueName: string,
    processMessage: (message: any) => Promise<any>
  ) {
    try {
      const log = debug("magicbox.messaging.receive");
      log("consuming messages from queue: ", queueName);
      const worker = new Worker(
        queueName,
        async (job) => {
          log("Received message: ", job.data);
          return "hello";
          //const msgDecoded: IMessage = JSON.parse(job.data.content.toString());
          //const result = await processMessage(msgDecoded);
        },
        this.connect()
      );

      while (true) {
        log("Waiting for message");
        await sleep(10000);
      }
    } catch (error) {
    } finally {
    }
  }
  hookup() {
    console.log("hookup");
  }
}
