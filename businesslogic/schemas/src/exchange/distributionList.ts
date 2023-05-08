import { z } from "zod";
import fields from "./fields";
import records from "./records";
export class distributionList {
  static view = records.createRequest.extend({
    primarySmtpAddress: fields.smtpAddress,
  });

  static createRequest = records.createRequest.extend({
    owners: fields.owners,
    members: fields.members

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
