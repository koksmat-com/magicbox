import {
  PowerPacks,
  EndPointHandler,
  Method,
  IEndPointHandler,
  EventHandler,
  IScript,
  EventHandlers,
  Events,
  EventTypes
} from "@koksmat/powerpacks";
import * as path from "path";
import { room, process } from "@koksmat/schemas";
import { z } from "zod";
import Create from "./create";
import Remove from "./remove";
import List from "./list";
import { inputType } from "./rooms.csv";
import { IResult } from "@koksmat/core";

const item = room.view;
type targetType = z.infer<typeof item>;



export class RoomCreate implements IEndPointHandler {
  eventsHandlers  = Events.newEventHandler();

  method: Method = "post";

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
  eventsHandlers  = Events.newEventHandler();
  method: Method = "delete";

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

export class EventHandlerLocal {
  private _data :any
  private _handler : (data:any)=>void


  constructor(handler: (data: any) => void) {

    this._handler = handler;
  
  }
  async emit(data:any) {
    return this._handler(data);
  }
}
export class RoomImport implements IEndPointHandler {
 
  async postProcess(input : any) {
   
     return  this.postProcessPowerShellRequest(input as inputType[]);
    
  }

  eventsHandlers  = Events.newEventHandler();
  constructor() {
    
    const handler = new EventHandler(async (data: any) => {})
    this.eventsHandlers.set("POSTPOWERSHELL",handler )
  
  }
  method: Method = "post";

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
  async postProcessPowerShellRequest(input: inputType[]) {
    for (let index = 0; index < input.length; index++) {
      const element = input[index];
      
      const item = this.mapCSV(element);
    }
   
  }



}

export function register(rootPath: string, registry: PowerPacks) {
  EndPointHandler.register(new RoomRemove(), rootPath, registry);
  EndPointHandler.register(new RoomCreate(), rootPath, registry);
  EndPointHandler.register(new RoomImport(), path.join(rootPath, "import"), registry);
}
