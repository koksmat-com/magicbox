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

    .action(async (name, displayName, alias, owners, members) => {
      //const options = program.opts();
      const logger = debug("magicbox.cli");

     const result = await Factory.getInstance().processMessage("post", "exchange/sharedmailbox", {
        name,
        displayName,
        alias,
        owners,
        members,
        readers: "",
      });

      console.log(chalk.grey("Result"), chalk.yellow(result));

      console.log(chalk.green("Ctrl+C to quit"));
      logger("Done");
      // process.exit(0);
    });
}
