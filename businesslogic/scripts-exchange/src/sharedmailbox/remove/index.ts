import {
  IEndPointHandler,
  ITestCase,
  LifecycleEvents,
  getExampleFromOpenAPIDefinition
} from "@koksmat/powerpacks";
import { sharedMailbox } from "@koksmat/schemas";
import PowerShell from "./powershell";


export default class SharedMailboxRemove implements IEndPointHandler {
  events: LifecycleEvents = {};

  summary = "Deletes a shared mailbox";
  operationDescription = "Deletes a shared mailbox";
  resultDescription = "Process result";
  output = sharedMailbox.deleteRequestResult
  input = sharedMailbox.deleteRequest
  testCases: ITestCase[] = [
    {
      name: "Generated from schema",
      data: getExampleFromOpenAPIDefinition(this.input)     
    }
  ];
  script = new PowerShell();
}
