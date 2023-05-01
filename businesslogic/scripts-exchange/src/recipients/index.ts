
import {
  PowerPacks,
  EndPointHandler,
  Method,
  IEndPointHandler,
  IScript,
} from "@koksmat/powerpacks";

import { resource } from "@koksmat/schemas"

import List from "./list";


export const routePath = "/Recipient";
export class RecipientList implements IEndPointHandler {
  method: Method = "get";
  path = routePath;
  summary = "Get recipients";
  operationDescription = "Get recipients";
  resultDescription = "Response";

  script: IScript = new List();
  input = {
    identity: this.constructor.name + "RequestDTO",
    schema: resource.room.createRequest
  }
  output= {
    identity: this.constructor.name + "ResponseDTO",
    schema: resource.room.createRequestResult
  };

 
  
}

 
}
export function register(path: string, registry: PowerPacks) {

  EndPointHandler.register(new RecipientList(), path, registry);
}
