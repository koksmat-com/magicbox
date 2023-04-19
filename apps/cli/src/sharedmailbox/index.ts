import { Command } from "commander";

import * as fs from "fs";
import path from "path";
import chalk from "chalk";
import { Messaging } from "@koksmat/messaging";
import debug from "debug";
import { Factory } from "@koksmat/factory";

export default function register(name: string, program: Command): void {
  program
    .command(name)
    .description("Creates a Shared Mailbox")
    .argument("name", "Name of the mailbox")
    .argument("displayName", "Display name of the mailbox")
    .argument("alias", "Alias of the mailbox")
    .argument("owners", "Owners of the mailbox")
    .argument("members", "Members of the mailbox")
    
    .action(async (name,displayName,alias,owners,members) => {



      //const options = program.opts();
      const logger = debug("magicbox.cli");
      logger("Creating shared mailbox", name);
      const factory : Factory = await Factory.getInstance();
      const handler = factory.router.matchRoute("post","exchange/sharedmailbox")
      if (!handler){
        console.log(chalk.red("No handler found"));
        logger("Done");
        process.exit(1);
      }

      const payload = {
        name,displayName,alias,owners,members,readers:""
      }

      const validationResult = factory.validateInput(handler,payload)
      /**
       * 
       *  
       */
      if (!validationResult.success){
        console.log(chalk.red("Validation failed"));
        validationResult.errors
        console.log(chalk.red(JSON.stringify(validationResult.error,null,2)));
        logger("Done");
        process.exit(1);
      }
   
   
      const message = {
        "name": "Shared Mailbox",
        exchangeScripts: {
          commandsToLoad : handler.script.commands,
          script: handler.script.code,
          payload
        }
      }

      handler

         // eslint-disable-next-line turbo/no-undeclared-env-vars
      const host = process.env.RABBITMQ_HOST ? process.env.RABBITMQ_HOST as string : "amqp://localhost"
      const messaging = await Messaging.getInstance(host);

      console.log("message",message)
      const messageBody = JSON.stringify(message,null,2);
      const output = await messaging.send("exchangeonline", "direct", "", messageBody);
    
      console.log(chalk.grey("Result"),chalk.yellow(output));
      
      console.log(chalk.green("Ctrl+C to quit"));
      logger("Done");
     // process.exit(0);
    });
}
