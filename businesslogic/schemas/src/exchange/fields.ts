import { z } from "zod";
import coreFields from "../core/fields";

export default class fields extends coreFields{
  static alias = z.string().trim().openapi({ example: "mailbox-alias" });
  static mailboxname = z.string().trim().openapi({ example: "mailbox-name" });
  static displayName = z.string().trim().openapi({ example: "Mailbox Name" });
  static owners = z.string().array().openapi({ example: ["AlexW"] });
  static members = z.string().array().openapi({ example: ["AlexW", "DebraB"] });
  static readers = z.string().array().openapi({ example: ["AlexW", "DebraB"] });
 
   

  static roomCapacity = z.number().int().positive().openapi({ example: 10 });
  static mailTip = z.string().trim().openapi({ example: "Not available until ..." });
}


