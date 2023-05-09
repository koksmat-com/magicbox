import {
  Method,
  IEndPointHandler,
  ITestCase,
  Events,
  LifecycleEvents
} from "@koksmat/powerpacks";
import { sharedMailbox } from "@koksmat/schemas";
import PowerShell from "./powershell";


export default class SharedMailboxRemove implements IEndPointHandler {
  events: LifecycleEvents = {};
  testCases: ITestCase[] = [];



  summary = "Deletes a shared mailbox";
  operationDescription = "Deletes a shared mailbox";
  resultDescription = "Process result";
  output = {
    identity: this.constructor.name + "ResponseDTO",
    schema: sharedMailbox.deleteRequestResult,
  };
  input = {
    identity: this.constructor.name + "RequestDTO",
    schema: sharedMailbox.deleteRequest,
  };
  script = new PowerShell();
}
