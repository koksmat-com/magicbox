import { Messaging ,IMessage} from "@koksmat/messaging";
import { Facade } from "@koksmat/facade";
import { PowershellService } from "@koksmat/core";

/**
 * The Worker is respobsible for monitor a queue and process the jobs placed in that, and respond by sending the result back to a response queue.
 */
export class Worker {
  private _shutdown: boolean = false;

  stop() {
    this._shutdown = true;
  }
  // a sleep function
  private sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async run() {
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    const messageServer = await Messaging.getInstance(process.env.RABBITMQ_HOST as string);
    console.log("setting up");
    

    while (!this._shutdown) {
      await messageServer.receive( "exchangeonline",  async (message: IMessage) => {
        if (!message.route){
          return {hasError:true,errorMessage:"No route specified"}
        }
        const result = await Facade.getInstance().processMessage(message.method,message.route,message)
       
        return result
      });
      
      console.log("Never going hit this");
    }
  }

 
}
