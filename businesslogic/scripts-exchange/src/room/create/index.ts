import {
  Method,
  IEndPointHandler, LifecycleEvents,
  getExampleFromOpenAPIDefinition
} from "@koksmat/powerpacks";

import { exchangeFields, exchangeRecords } from "@koksmat/schemas";
import PowerShell from "./powershell";



export default class RoomCreate implements IEndPointHandler {
  events: LifecycleEvents = {};
  method: Method = "post";

  summary = "Creates a room";
  operationDescription = "Creates a room";
  resultDescription = "Response";

  script = new PowerShell();
  input = exchangeRecords.createRequest.extend({
    capacity: exchangeFields.roomCapacity
  });
  output = exchangeRecords.createRequestResult.extend({
    primarySmtpAddress: exchangeFields.smtpAddress,
  });
  testCases = [getExampleFromOpenAPIDefinition(this.input)];


}
