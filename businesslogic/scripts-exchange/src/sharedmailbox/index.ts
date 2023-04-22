import { z } from "zod";
import {
  PowerPacks,
  EndPointHandler,
  Method,
  IEndPointHandler,
  Request,
  Response,
  IScript,
} from "@koksmat/powerpacks";
import { Files, IResult, PowershellService } from "@koksmat/core";
import * as path from "path";
import * as fs from "fs";

import Create from "./create";
import Remove from "./remove";
import debug from 'debug';
import { v4 as uuidv4 } from "uuid";
export const routePath = "/sharedmailbox";
export class SharedMailboxCreate implements IEndPointHandler {
  method: Method = "post";
  path = routePath;
  summary = "Creates a shared mailbox";
  operationDescription = "Creates a shared mailbox";
  resultDescription = "Response";

  script: IScript;
  input: { identity: string; schema: z.ZodType<any, z.ZodTypeDef, any> };
  output: { identity: string; schema: z.ZodType<any, z.ZodTypeDef, any> };

  constructor() {
    this.script = new Create();

    this.input = {
      identity: this.constructor.name + "RequestDTO",
      schema: z.object({
        name: z.string().trim().openapi({ example: "sharedmailbox" }),
        displayName: z.string().trim().openapi({ example: "Shared Mailbox" }),
        alias: z.string().trim().openapi({ example: "sharedmailbox" }),
        owners: z.string().openapi({ example: '["AlexW"]' }),
        members: z.string().openapi({ example: '["AlexW", "DebraB"]' }),
        readers: z.string().openapi({ example: '["AlexW", "DebraB"]' }),
      }),
    };
    this.output = {
      identity: this.constructor.name + "ResponseDTO",
      schema: z.object({
        Identity: z
          .string()
          .openapi({ example: "5b9c7f32-1245-42da-b96c-186362475009" }),
        Name: z.string().openapi({ example: "sharedmailbox" }),
        DisplayName: z.string().openapi({ example: "Shared Mailbox" }),
        PrimarySmtpAddress: z
          .string()
          .openapi({ example: "sharedmailbox@M1243xx11.onmicrosoft.com" }),
      }),
    };
  }
  async process(rawInput: Request): Promise<IResult<any>> {
    const log = debug("magicbox:businesslogic:scripts-exchange:sharedmailbox:create")
    let result: IResult<z.infer<typeof this.output.schema>> = {
      hasError: false,
    };
    const zodParse = this.input.schema.safeParse(rawInput.body);
    if (!zodParse.success) {
      result.hasError = true;
      result.errorMessage = JSON.parse(zodParse.error.message);
      return result;
    }
    const input = zodParse.data;
    const shell = new PowershellService();
    const uuid = uuidv4()
    // const tempPath = Files.createTempDir();
    // const filepath = path.join(tempPath, "powerbrick.ps1");
    // log("Writing code to %s", filepath)
    // fs.writeFileSync(filepath, this.script.code);

    let script = `
    write-warning "Starting script"

    function powerbrick {
      ${this.script.code}
    }

    powerbrick -Name "test${uuid}" -DisplayName "test${uuid}" -Alias "test${uuid}" -Owner "test" -Members "test" -Readers "test"

    `
// script = `
// write-warning "Starting script"

// `
   const powerShellResult = await shell.executeExchange({
      commandsToLoad: this.script.commands,
      script,
      certificate: process.env.EXCHCERTIFICATE as string,
      appId: process.env.EXCHAPPID as string,
      appSecret: "x",
      organization: process.env.EXCHORGANIZATION as string,
    });
    
 //   fs.rmSync(tempPath, { recursive: true, force: true });
    if (powerShellResult.hasError) {
      return powerShellResult
    }

    if (powerShellResult.data.error.length>0) {
      result.hasError = true;
      result.errorMessage = powerShellResult.data.error[0];
      return result;

    }
    
    const outputParse = this.output.schema.safeParse(powerShellResult.data.success[0]);

    if (!outputParse.success) {
      result.hasError = true;
      result.errorMessage = JSON.parse(outputParse.error.message);
      return result;
    }

    result.data = outputParse.data;

    // result.data = {
    //   Identity: "5b9c7f32-1245-42da-b96c-186362475009",
    //   Name: zodParse.data.name,
    //   DisplayName: zodParse.data.displayName,
    //   PrimarySmtpAddress: zodParse.data.alias + "@M1243xx11.onmicrosoft.com",
    // };
    return result;
  }
}
export class SharedMailboxRemove implements IEndPointHandler {
  method: Method = "delete";
  path = routePath;
  summary = "Deletes a shared mailbox";
  operationDescription = "Deletes a shared mailbox";
  resultDescription = "Response";
  output: { identity: string; schema: z.ZodType<any, z.ZodTypeDef, any> };
  input: { identity: string; schema: z.ZodType<any, z.ZodTypeDef, any> };
  script: any;
  constructor() {
    this.script = new Remove();
    this.output = {
      identity: this.constructor.name + "ResponseDTO",
      schema: z.object({
        Message: z.string().openapi({ example: "Mailbox deleted" }),
      }),
    };

    this.input = {
      identity: this.constructor.name + "RequestDTO",

      schema: z.object({
        email: z.string().email().openapi({
          description: "Deletes a Shared Mailbox",
          example: "xxdfs@M1243xx11.onmicrosoft.com",
        }),
      }),
    };
  }

  async process(input: Request): Promise<IResult<any>> {
    const result: IResult<z.infer<typeof this.output.schema>> = {
      hasError: false,
    };
    const zodParse = this.input.schema.safeParse(input.body);
    if (!zodParse.success) {
      result.hasError = true;
      result.errorMessage = JSON.parse(zodParse.error.message);
      return result;
    }
    result.data = {
      Message: `Mailbox deleted ${zodParse.data.email}`,
    };
    return result;
  }
}
export function register(path: string, registry: PowerPacks) {
  EndPointHandler.register(new SharedMailboxRemove(), path, registry);
  EndPointHandler.register(new SharedMailboxCreate(), path, registry);
}
