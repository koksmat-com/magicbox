import { Messaging } from "@koksmat/messaging";
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
    //const _messageServer = await Messaging.getInstance();
    console.log("setting up");
    //_messageServer.hookup();

    while (!this._shutdown) {
      await this.sleep(1000);
      console.log("run");
    }
  }

  async testExchange() {
    const shell = new PowershellService();
    const result = await shell.executeExchange({
      commandsToLoad: ["get-mailbox"],
      script: "get-mailbox -resultsize 1 | select *name*",
      certificate: process.env.EXCHCERTIFICATE as string,
      appId: process.env.EXCHAPPID as string,
      appSecret: "x",
      organization: process.env.EXCHORGANIZATION as string,
    });
    console.log("Exchange First mailbox");
    console.log((result.success[0] as any)?.UserPrincipalName);
    return result;
  }
}
