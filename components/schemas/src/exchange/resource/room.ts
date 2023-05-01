import { z } from "zod";
import fields from "../fields";
import records from "../records";

export class room {

  static createRequest = records.createRequest.extend({
    capacity: fields.roomCapacity
  });

  static createRequestResult = records.createRequestResult.extend({
    primarySmtpAddress: fields.smtpAddress,
  });

  static deleteRequest = z.object({
    email: fields.smtpAddress
  });

  static deleteRequestResult = z.object({
    result: fields.processResult
  });
}
