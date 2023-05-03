import { z } from "zod";

export default class fields {

  static identity = z
    .string()
    .openapi({ example: "5b9c7f32-1245-42da-b96c-186362475009" });
  static smtpAddress = z
    .string()
    .openapi({ example: "mailbox-alias@M1243xx11.onmicrosoft.com" });
   
  static processResult = z.string().trim().openapi({ example: "Processed OK" });
  
}


