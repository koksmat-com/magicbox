
import {
  PowerPacks,
  EndPointHandler,
  Method,
  IEndPointHandler,
  IScript,
} from "@koksmat/powerpacks";

import { mailbox } from "@koksmat/schemas"

import Create from "./create";
import Remove from "./remove";

export const routePath = "/sharedmailbox";
export class SharedMailboxCreate implements IEndPointHandler {
  method: Method = "post";
  path = routePath;
  summary = "Creates a shared mailbox";
  operationDescription = "Creates a shared mailbox";
  resultDescription = "Response";

  script: IScript = new Create();
  input = {
    identity: this.constructor.name + "RequestDTO",
    schema: mailbox.shared.createRequest
  }
  output= {
    identity: this.constructor.name + "ResponseDTO",
    schema: mailbox.shared.createRequestResult
  };

 
  
}
export class SharedMailboxRemove implements IEndPointHandler {
  method: Method = "delete";
  path = routePath;
  summary = "Deletes a shared mailbox";
  operationDescription = "Deletes a shared mailbox";
  resultDescription = "Process result";
  output = {
    identity: this.constructor.name + "ResponseDTO",
    schema: mailbox.shared.deleteRequestResult,
  };
  input = {
    identity: this.constructor.name + "RequestDTO",
    schema:  mailbox.shared.deleteRequest
  };
  script =  new Remove();
 
}
export function register(path: string, registry: PowerPacks) {
  EndPointHandler.register(new SharedMailboxRemove(), path, registry);
  EndPointHandler.register(new SharedMailboxCreate(), path, registry);
}
