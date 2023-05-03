import {
  PowerPacks,
  EndPointHandler,
  Method,
  IEndPointHandler,
  IScript,
} from "@koksmat/powerpacks";
import * as path from "path";
import { room, process } from "@koksmat/schemas";
import { z } from "zod";
import Create from "./create";
import Remove from "./remove";
import List from "./list";
import { inputType } from "./rooms.csv";

const item = room.view;
type targetType = z.infer<typeof item>;


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
    schema: room.createRequest,
  };
  output = {
    identity: this.constructor.name + "ResponseDTO",
    schema: room.createRequestResult,
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
    schema: room.deleteRequestResult,
  };
  input = {
    identity: this.constructor.name + "RequestDTO",
    schema: room.deleteRequest,
  };
  script = new Remove();
}

export class RoomImport implements IEndPointHandler {
  method: Method = "post";
  path = path.join(routePath, "import");
  summary = "Import Rooms from Exchange";
  operationDescription = "Import Rooms from Exchange";
  resultDescription = "Process result";
  output = {
    identity: this.constructor.name + "ResponseDTO",
    schema: process.processRequest,
  };
  input = {
    identity: this.constructor.name + "RequestDTO",
    schema: room.deleteRequest,
  };
  script = new List();

   mapCSV(input:inputType) : targetType {
    const target : targetType = {
      displayName: input.DisplayName,
      name: input.Name,
      mailTip: input.MailTip,
      //resourceType : input.ResourceType,
      primarySmtpAddress: input.PrimarySmtpAddress,
      //whenCreatedUTC : input.WhenCreatedUTC,
      capacity: parseInt(input.ResourceCapacity),
      alias : input.Alias,
    }
    return target;
  }
  async postProcessPowerShellRequest(input: inputType[], output: any) {
    for (let index = 0; index < input.length; index++) {
      const element = input[index];
      
      const item = this.mapCSV(element);
    }
    return output;
  }
}

export function register(path: string, registry: PowerPacks) {
  EndPointHandler.register(new RoomRemove(), path, registry);
  EndPointHandler.register(new RoomCreate(), path, registry);
  EndPointHandler.register(new RoomImport(), path, registry);
}
