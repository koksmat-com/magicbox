import { z } from "zod";
import { IResult } from "@koksmat/core";
import { PowerPacks } from "./powerpacks";
import { IScript } from "./IScript";
import { LifecycleEvents, Request, Response } from ".";
export type Method = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head' | 'options' | 'trace';

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
 method: Method;
   script: IScript;
   summary: string;
   operationDescription : string;
   resultDescription : string;
   input: { identity: string; schema: z.ZodSchema<any> };
   output: { identity: string; schema: z.ZodSchema<any> }
   eventsHandlers: EventHandlers;
   testCases: Array<ITestCase>
   events : LifecycleEvents

}

export  class EndPointHandler { 
 
  static register(endPoint: IEndPointHandler,  path: string,powerPacks:PowerPacks)  {
    powerPacks.addEndpoint(path,endPoint.method,endPoint)
    powerPacks.registry.registerPath({  
      method: endPoint.method as any,
      path,
      summary: endPoint.summary,
      request: {
        body: {
          description: endPoint.operationDescription,
          content: {
            "application/json": {
              schema: endPoint.input.schema,
            },
          },
        },
      },
      responses: {
        200: {
          description: endPoint.resultDescription,
          content: {
            "application/json": {
              schema: endPoint.output.schema,
            },
          },
        },
      },
    });
  }

}
