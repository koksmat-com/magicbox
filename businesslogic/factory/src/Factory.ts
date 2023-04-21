import { register as registerExchange } from "@koksmat/scripts-exchange";
import { IEndPointHandler, PowerPacks } from "@koksmat/powerpacks";
import { IRouter, Router } from "./Router";
import chalk from "chalk";
import { Messaging } from "@koksmat/messaging";
import debug from "debug";
import { IResult } from "@koksmat/core";

/**
 * Factory class
 * 
 * Is the core in MagicBox architecture.
 * 
 * From here you can access to all the other modules. 
 * 
 * ## How to use it
 * The factoryy is implemented using a singleton, so you can access it from anywhere in your code.
 * ```typescript
 * import { Factory } from "@koksmat/factory";
 * 
 * const factory = Factory.getInstance();
 * 
 * ```
 */
export class Factory {
     /** @private */
    static _instance: Factory;
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
        if (!Factory._instance) {
            Factory._instance = new Factory();
        }
        return Factory._instance;

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

    public async processMessage(method:string, path:string,payload:object) : Promise<IResult<any>>{
        const logger = debug("magicbox.factory");
        let result : IResult<any> = {
            hasError: false
        }
        const handler = this.router.matchRoute(method,path)
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
     
    
        const message = {
          "name": path,
          exchangeScripts: {
            commandsToLoad : handler.script.commands,
            script: handler.script.code,
            payload
          }
        }
  
        
  
           // eslint-disable-next-line turbo/no-undeclared-env-vars
        const host = process.env.RABBITMQ_HOST ? process.env.RABBITMQ_HOST as string : "amqp://localhost"
        const messaging = await Messaging.getInstance(host);
        const response = await messaging.send("exchangeonline",  message);
        result = response
        return result
    }
}
