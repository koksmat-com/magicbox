import {
  PowerPacks,
  EndPointHandler,
  Method,
  IEndPointHandler,
  ITestCase,
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


class ExchangeBase {
  eventsHandlers  = Events.newEventHandler();
}
export class RoomCreate extends ExchangeBase implements IEndPointHandler {
  method: Method = "post";
  testCases: ITestCase[] = [];
  summary = "Creates a room";
  operationDescription = "Creates a room";
  resultDescription = "Response";

  script = new Create();
  input = {
    identity: this.constructor.name + "RequestDTO",
    schema: room.createRequest,
  };
  output = {
    identity: this.constructor.name + "ResponseDTO",
    schema: room.createRequestResult,
  };

  
}
export class RoomRemove extends ExchangeBase  implements IEndPointHandler {

  method: Method = "delete";
  testCases: ITestCase[] = [];
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

export class RoomImport extends ExchangeBase implements IEndPointHandler {
 
  method: Method = "post";
  testCases: ITestCase[] = [];
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

   mapCSV(input:inputType) : IResult<targetType> {
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
    const parsedData =  item.safeParse(target);
    if (!parsedData.success ) {
      return {hasError:true,errorMessage:parsedData.error.message}
    }else{
      return {hasError:false,data:parsedData.data}
    }
   
  }
  async onPostProcessPowerShellRequest(input: inputType[]) {
    for (let index = 0; index < input.length; index++) {
      const element = input[index];
      
      const mapItemResult = this.mapCSV(element);
      if (mapItemResult.hasError) {

      }else{
        console.log(mapItemResult.data?.displayName,mapItemResult.data?.primarySmtpAddress)
      }
    }
   
  }



}

export function register(rootPath: string, registry: PowerPacks) {
  EndPointHandler.register(new RoomRemove(), rootPath, registry);
  EndPointHandler.register(new RoomCreate(), rootPath, registry);
  EndPointHandler.register(new RoomImport(), path.join(rootPath, "import"), registry);
}
