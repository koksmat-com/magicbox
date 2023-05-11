import {
  Method,
  IEndPointHandler, LifecycleEvents,
  getExampleFromOpenAPIDefinition
} from "@koksmat/powerpacks";

import { z } from "zod";
import { exchangeFields, exchangeRecords ,coreFields} from "@koksmat/schemas";

import PowerShell from "./powershell";



export default class RoomRemove implements IEndPointHandler {
  events: LifecycleEvents = {};
  method: Method = "delete";

  summary = "Deletes a room";
  operationDescription = "Deletes a room";
  resultDescription = "Process result";
  output = z.object({
    result: coreFields.processResult
  });

  input =  z.object({
    email: exchangeFields.smtpAddress
  });

  script = new PowerShell();
  testCases = [getExampleFromOpenAPIDefinition(this.input)];
}
