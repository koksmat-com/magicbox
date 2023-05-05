
import {
  PowerPacks,
  EndPointHandler,
  Method,
  IEndPointHandler,
  ITestCase,
  IScript,
  Events,
} from "@koksmat/powerpacks";

import { sharedMailbox } from "@koksmat/schemas"

import Create from "./create";
import Remove from "./remove";


export class SharedMailboxCreate implements IEndPointHandler {
  testCases: ITestCase[] = [{
    name: "Create shared mailbox",
    data: {
      "name": "mailbox-name",
      "displayName": "Mailbox Name",
      "alias": "mailbox-alias",
      "owners": "[\"AlexW\"]",
      "members": "[\"AlexW\", \"DebraB\"]",
      "readers": "[\"AlexW\", \"DebraB\"]"
    }}];
    
  eventsHandlers  = Events.newEventHandler();
  method: Method = "post";

  summary = "Creates a shared mailbox";
  operationDescription = "Creates a shared mailbox";
  resultDescription = "Response";

  script: IScript = new Create();
  input = {
    identity: this.constructor.name + "RequestDTO",
    schema: sharedMailbox.createRequest
  }
  output= {
    identity: this.constructor.name + "ResponseDTO",
    schema: sharedMailbox.createRequestResult
  };

 
  
}
export class SharedMailboxRemove implements IEndPointHandler {
  testCases: ITestCase[] = [];
  eventsHandlers  = Events.newEventHandler();
  method: Method = "delete";
 
  summary = "Deletes a shared mailbox";
  operationDescription = "Deletes a shared mailbox";
  resultDescription = "Process result";
  output = {
    identity: this.constructor.name + "ResponseDTO",
    schema: sharedMailbox.deleteRequestResult,
  };
  input = {
    identity: this.constructor.name + "RequestDTO",
    schema:  sharedMailbox.deleteRequest
  };
  script =  new Remove();
 
}
export function register(path: string, registry: PowerPacks) {
  EndPointHandler.register(new SharedMailboxRemove(), path, registry);
  EndPointHandler.register(new SharedMailboxCreate(), path, registry);
}
