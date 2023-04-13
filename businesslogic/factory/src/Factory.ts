import { register as registerExchange } from "@nexi-magicbox/scripts-exchange";
import { PowerPacks } from "@nexi-magicbox/powerpacks";
import { IRouter, Router } from "./Router";


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
 * import { Factory } from "@nexi-magicbox/factory";
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

}
