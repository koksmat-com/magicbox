
import {
  PowerPacks,
  EndPointHandler,
  Method,
  IEndPointHandler,
  IScript,
} from "@koksmat/powerpacks";

import { resource } from "@koksmat/schemas"

import Create from "./create";
import Remove from "./remove";

export const routePath = "/Room";
export class RoomCreate implements IEndPointHandler {
  method: Method = "post";
  path = routePath;
  summary = "Creates a room";
  operationDescription = "Creates a room";
  resultDescription = "Response";

  script: IScript = new Create();
  input = {
    identity: this.constructor.name + "RequestDTO",
    schema: resource.room.createRequest
  }
  output= {
    identity: this.constructor.name + "ResponseDTO",
    schema: resource.room.createRequestResult
  };

 
  
}
export class RoomRemove implements IEndPointHandler {
  method: Method = "delete";
  path = routePath;
  summary = "Deletes a room";
  operationDescription = "Deletes a room";
  resultDescription = "Process result";
  output = {
    identity: this.constructor.name + "ResponseDTO",
    schema: resource.room.deleteRequestResult,
  };
  input = {
    identity: this.constructor.name + "RequestDTO",
    schema:  resource.room.deleteRequest
  };
  script =  new Remove();
 
}
export function register(path: string, registry: PowerPacks) {
  EndPointHandler.register(new RoomRemove(), path, registry);
  EndPointHandler.register(new RoomCreate(), path, registry);
}
