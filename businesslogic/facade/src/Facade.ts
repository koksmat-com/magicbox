import { register as registerExchange } from "@koksmat/scripts-exchange";
import { IEndPointHandler, PowerPacks, processPowerPack, Request } from "@koksmat/powerpacks";
import { IRouter, Router } from "./Router";
import chalk from "chalk";
import { Messaging , IMessage } from "@koksmat/messaging";
import debug from "debug";
import { IResult } from "@koksmat/core";





/**
 * Facade class
 * 
 * Is the core in MagicBox architecture.
 * 
 * From here you can access to all the other modules. 
 * 
 * ## How to use it
 * The facadey is implemented using a singleton, so you can access it from anywhere in your code.
 * ```typescript
 * import { Facade } from "@koksmat/facade";
 * 
 * const facade = Facade.getInstance();
 * 
 * ```
 */


export class Facade {
     /** @private */
    static _instance: Facade;
     /** @private */
    private _router: Router;
   

    /**
     * Constructor is setting up the PowerPacks and the router
     */
    constructor() {
        const powerPacks = PowerPacks.getInstance();
        
     
        registerExchange("exchange", powerPacks);


        this._router = new Router(powerPacks);

    }

    public static getInstance() {
        if (!Facade._instance) {
            Facade._instance = new Facade();
        }
        return Facade._instance;

    }
    
    public get routeKeys() : string[] {
        return this.powerPacks.routeKeys
    }
    

    public get router(): Router {
        return this._router;
    }

    public get powerPacks(): PowerPacks {
        return PowerPacks.getInstance();
    }
    validateInput(endPoint: IEndPointHandler, input: any): any {
        return endPoint.input.schema.safeParse(input);

    }
    validateOutput(endPoint: IEndPointHandler, output: any): any {
        return endPoint.output.schema.safeParse(output);

    }

    public async processMessage(method:"get" | "put" | "post" | "delete" , route:string,payload:object,viewScript?:boolean) : Promise<IResult<any>>{
        const logger = debug("magicbox.facade");
        let result : IResult<any> = {
            hasError: false
        }
        const handler = this.router.matchRoute(method,route)
        if (!handler){
            result.hasError = true
            result.errorMessage = "No handler found"
            return result
        }
  
       
  
        const validationResult = this.validateInput(handler,payload)
        if (!validationResult.success){
            result.hasError = true
            result.errorMessage = JSON.stringify(validationResult.error,null,2)
            return result
          
        }
     
        
        const request : Request = {query:"",body:payload}
        result = await processPowerPack(handler,request,viewScript)
        return result
    }

    public async postMessage(method:string, route:string,payload:object) : Promise<IResult<any>>{
        const logger = debug("magicbox.facade");
        let result : IResult<any> = {
            hasError: false
        }
        const handler = this.router.matchRoute(method,route)
        if (!handler){
            result.hasError = true
            result.errorMessage = "No handler found"
            return result
        }
  
       
  
        const validationResult = this.validateInput(handler,payload)
        if (!validationResult.success){
            result.hasError = true
            result.errorMessage = JSON.stringify(validationResult.error,null,2)
            return result
          
        }
     
    
        const message : IMessage= {
          route,
          method,
          payload: {
            commandsToLoad : handler.script.commands,
            script: handler.script.code,
            payload
          }
        }
  
        
  
           // eslint-disable-next-line turbo/no-undeclared-env-vars
        const host = process.env.RABBITMQ_HOST ? process.env.RABBITMQ_HOST as string : "amqp://localhost"
        const messaging = await Messaging.getInstance(host);
        const response = await messaging.send("exchangeonline", message );
        result = response
        return result
    }
}
