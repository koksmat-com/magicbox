import {
  Method,
  IEndPointHandler, LifecycleEvents,
  getExampleFromOpenAPIDefinition
} from "@koksmat/powerpacks";
import { room } from "@koksmat/schemas";
import { z } from "zod";
import { exchangeFields, exchangeRecords } from "@koksmat/schemas";
import PowerShell from "./powershell";



export default class RoomRemove implements IEndPointHandler {
  events: LifecycleEvents = {};
  method: Method = "delete";

  summary = "Deletes a room";
  operationDescription = "Deletes a room";
  resultDescription = "Process result";
  output = room.deleteRequestResult;

  input =  z.object({
    email: exchangeFields.smtpAddress
  });

  script = new PowerShell();
  testCases = [getExampleFromOpenAPIDefinition(this.input)];
}
