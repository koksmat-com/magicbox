import { z } from "zod";
import { IResult } from "@nexi-magicbox/core";
import { PowerPacks } from "./powerpacks";
import { IScript } from "./PowerPack";
import { Request, Response } from ".";
export type Method = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head' | 'options' | 'trace';

export interface IEndPointHandler {
 method: Method;
   script: IScript;
   summary: string;
   operationDescription : string;
   resultDescription : string;
   input: { identity: string; schema: z.ZodSchema<any> };
   output: { identity: string; schema: z.ZodSchema<any> };
   process(input: Request): Promise<IResult<any>> 
  

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
