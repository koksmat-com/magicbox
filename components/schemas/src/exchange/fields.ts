import { z } from "zod";

export default class fields {
  static alias = z.string().trim().openapi({ example: "mailbox-alias" });
  static mailboxname = z.string().trim().openapi({ example: "mailbox-name" });
  static displayName = z.string().trim().openapi({ example: "Mailbox Name" });
  static owners = z.string().openapi({ example: '["AlexW"]' });
  static members = z.string().openapi({ example: '["AlexW", "DebraB"]' });
  static readers = z.string().openapi({ example: '["AlexW", "DebraB"]' });
  static identity = z
    .string()
    .openapi({ example: "5b9c7f32-1245-42da-b96c-186362475009" });
  static smtpAddress = z
    .string()
    .openapi({ example: "mailbox-alias@M1243xx11.onmicrosoft.com" });
   
  static processResult = z.string().trim().openapi({ example: "Processed OK" });
  static roomCapacity = z.number().int().positive().openapi({ example: 10 });
}


