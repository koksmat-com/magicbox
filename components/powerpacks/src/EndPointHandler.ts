import { z } from "zod";
import { IResult } from "@koksmat/core";
import { PowerPacks } from "./powerpacks";
import { IScript } from "./IScript";
import { LifecycleEvents, Request, Response } from ".";
export type Method = "get" | "post" | "put" | "delete" | "patch" | "head" | "options" | "trace";

export enum EventTypes {
  postpowershell = "POSTPOWERSHELL",
  post = "POST"
}
export class EventHandler {
  private _data :any
  private _handler : (data:any)=>void


  constructor(handler: (data: any) => void) {

    this._handler = handler;
  
  }
  async emit(data:any) {
    return this._handler(data);
  }
}
export type EventHandlers = Map<string, EventHandler>;
export class Events {
 
 static newEventHandler() : EventHandlers {
  return  new Map<EventTypes,EventHandler>();
 }
 
}
export interface ITestCase {
  name : string,

  data:object
}
export interface IEndPointHandler {

   script: IScript;
   summary: string;
   operationDescription : string;
   resultDescription : string;
   input: z.ZodSchema<any> 
   output:  z.ZodSchema<any> 

   testCases: Array<ITestCase>
   events : LifecycleEvents

}

export  class EndPointHandler { 
 
  static register(endPoint: IEndPointHandler,method:Method,  path: string,powerPacks:PowerPacks)  {

    const inputSchema : { identity: string; schema: z.ZodSchema<any> }= {
      identity: path.replace(/\//g, "") + "RequestDTO",
      schema: endPoint.input
    }
    const outputSchema : { identity: string; schema: z.ZodSchema<any> }= {
      identity: path.replace(/\//g, "") + "ResponseDTO",
      schema: endPoint.output
    }
    powerPacks.addEndpoint(path,method,endPoint)
    powerPacks.registry.registerPath({  
      method: method as any,
      path,
      summary: endPoint.summary,
      request: {
        body: {
          description: endPoint.operationDescription,
          content: {
            "application/json": {
              schema: inputSchema //endPoint.input.schema,
            },
          },
        },
      },
      responses: {
        200: {
          description: endPoint.resultDescription,
          content: {
            "application/json": {
              schema: outputSchema
            },
          },
        },
      },
    });
  }

}
