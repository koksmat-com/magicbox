import { Command } from "commander";

import path from "path";
import chalk from "chalk";
import { Messaging } from "@koksmat/messaging";
import debug from "debug";
import { Factory } from "@koksmat/factory";
import { IResult } from "@koksmat/core";
import { extractEmails,extractAddressBook } from "@koksmat/schemas";

export default function register(name: string, program: Command): void {
  program
    .command(name)
    .description("Transform")
    .argument("rule", "Transform rule")
    .argument("input", "Input file")
    .argument("output", "Output file")

    .action(async (transformRule: string, fromFile: string, toFile: string) => {
      //const options = program.opts();
      const logger = debug("magicbox.cli.transformer");
      const timeStamp = new Date().toISOString();
      let result: IResult<string> = {
        hasError: false,
        errorMessage: "",
        data: "",
      };
      switch (transformRule.toLowerCase()) {
        case "recipients":
          result = await extractAddressBook(fromFile, timeStamp, toFile);

          break;
        case "emails":
          result = await extractEmails(fromFile, timeStamp, toFile);

          break;

        default:
          result.hasError = true;
          result.errorMessage = `Unknown transform rule ${transformRule}`;
          break;
      }

      if (result.hasError) {
        console.log(
          chalk.redBright("Error "),
          chalk.red(JSON.stringify(result.errorMessage, null, 2))
        );
       

        process.exit(1);
      } else {
        console.log(chalk.grey("Result"), chalk.green(toFile));
        logger("Done");

        process.exit(0);
      }

   
    });
}

