import { z } from "zod";
import {
  PowerPacks,
  EndPointHandler,
  Method,
  IEndPointHandler,
  Request,
  Response,
} from "@koksmat/powerpacks";
import { IResult } from "@koksmat/core";

import Create from "./create";
import Remove from "./remove";
import { xor } from "lodash";
export const path = "/sharedmailbox";
export class SharedMailboxCreate implements IEndPointHandler {
  method: Method = "post";
  path = path;
  summary = "Creates a shared mailbox";
  operationDescription = "Creates a shared mailbox";
  resultDescription = "Response";

  script: any;
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
        owners: z
          .string()
          .openapi({ example: '["AlexW"]' }),
        members: z
          .string()
          .openapi({ example: '["AlexW", "DebraB"]' }),
        readers: z
          .string()
          .openapi({ example: '["AlexW", "DebraB"]' }),
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
      Identity: "5b9c7f32-1245-42da-b96c-186362475009",
      Name: zodParse.data.name,
      DisplayName: zodParse.data.displayName,
      PrimarySmtpAddress: zodParse.data.alias + "@M1243xx11.onmicrosoft.com",
    };
    return result;
  }
}
export class SharedMailboxRemove implements IEndPointHandler {
  method: Method = "delete";
  path = path;
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
