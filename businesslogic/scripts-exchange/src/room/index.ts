import {
  PowerPacks,
  EndPointHandler,
  Method,
  IEndPointHandler,
  ITestCase,
  LifecycleEvents,
  getExampleFromOpenAPIDefinition
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


export class RoomCreate  implements IEndPointHandler {
  events: LifecycleEvents = {}
  method: Method = "post";
  
  summary = "Creates a room";
  operationDescription = "Creates a room";
  resultDescription = "Response";

  script = new Create();
  input = room.createRequest
  output = room.createRequestResult
  testCases: ITestCase[] = [
    {
      name: "Generated from schema",
      data: getExampleFromOpenAPIDefinition(this.input)
      
    },
  ];

  
}
export class RoomRemove  implements IEndPointHandler {
  events: LifecycleEvents = {}
  method: Method = "delete";
 
  summary = "Deletes a room";
  operationDescription = "Deletes a room";
  resultDescription = "Process result";
  output =room.deleteRequestResult
  
  input =room.deleteRequest

  script = new Remove();
  testCases: ITestCase[] = [
    {
      name: "Generated from schema",
      data: getExampleFromOpenAPIDefinition(this.input)
      
    },
  ];
}

export class RoomImport implements IEndPointHandler {
  events: LifecycleEvents = {}
  method: Method = "post";
  
  summary = "Import Rooms from Exchange";
  operationDescription = "Import Rooms from Exchange";
  resultDescription = "Process result";
  output = process.processRequest
  input =  room.deleteRequest

  testCases: ITestCase[] = [
    {
      name: "Generated from schema",
      data: getExampleFromOpenAPIDefinition(this.input)
      
    },
  ];
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
  EndPointHandler.register(new RoomRemove(), "delete",rootPath, registry);
  EndPointHandler.register(new RoomCreate(), "post",rootPath, registry);
  EndPointHandler.register(new RoomImport(), "post",path.join(rootPath, "import"), registry);
}
