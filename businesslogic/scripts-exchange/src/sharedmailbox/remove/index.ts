import {
  IEndPointHandler,
  ITestCase,
  LifecycleEvents,
  getExampleFromOpenAPIDefinition
} from "@koksmat/powerpacks";
import { z } from "zod";
import { exchangeFields, exchangeRecords,coreFields} from "@koksmat/schemas";
import PowerShell from "./powershell";


export default class SharedMailboxRemove implements IEndPointHandler {
  events: LifecycleEvents = {};

  summary = "Deletes a shared mailbox";
  operationDescription = "Deletes a shared mailbox";
  resultDescription = "Process result";
  output = z.object({
    result: coreFields.processResult
  });
  input = z.object({
    email: coreFields.smtpAddress
  })
  testCases = [getExampleFromOpenAPIDefinition(this.input)];
  script = new PowerShell();
}

