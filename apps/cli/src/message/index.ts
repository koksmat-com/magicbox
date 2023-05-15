import { Command } from "commander";

import * as fs from "fs";
import path from "path";
import chalk from "chalk";
import { Messaging } from "@koksmat/messaging";
import debug from "debug";


export default function register(name: string, program: Command): void {
  program
    .command(name)
    .description("Place a message on a queue")
    .argument("message", "Message")
    .option("--companyname [name]", "Company name") 
    .action(async (message) => {
      //const options = program.opts();
      const logger = debug("magicbox.cli");
      logger("Message", message);
      
      const messaging = await Messaging.getInstance("amqp://localhost");
      const output = await messaging.send("test",  message);
    
      console.log(chalk.grey("Result"),chalk.yellow(output));
      
      console.log(chalk.green("Ctrl+C to quit"));
      logger("Done");
     // process.exit(0);
    });
}
