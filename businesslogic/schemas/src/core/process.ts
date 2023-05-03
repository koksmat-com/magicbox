import { z } from "zod";
import fields from "./fields";
import records from "./records";

export class process {


  static  processRequest = z.object({
    correalationId: fields.identity
  });

  static processRequestResult = z.object({
    correalationId: fields.identity,
    processResult: fields.processResult,
    
  })
}
