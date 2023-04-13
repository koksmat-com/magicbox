#! /usr/bin/env node

const figlet = require("figlet");
const { Command } = require("commander");
const program = new Command();
import { register,SharedMailboxCreate } from "@nexi-magicbox/scripts-exchange";
import { PowerPacks } from "@nexi-magicbox/powerpacks";
import connectorValidation from "./connector-validation"
import { CommanderError } from "commander";
import chalk from "chalk";

console.log(figlet.textSync("MagicBox"));

program
  .version("1.0.0")
  .description("CLI for MagicBox")
  

  connectorValidation("validate",program)
 

  program.exitOverride((err: CommanderError) => {
    if (err) {
      chalk.redBright("Command Error", err.message);
    }
  });
  
  try {
    program.parse();
  } catch (err) {
    chalk.redBright("CLI error", err);
  } finally {
    //  client.flush()
  }
  
/*
const options = program.opts();

if (options.schema) {
    const registry = PowerPacks.getInstance();
  register();
 
  const schema = registry.getOpenApiDocumentation();
  console.log(JSON.stringify(schema,null,2));

  process.exit(0);
}

if (options.create) {

  console.log(SharedMailboxCreate.process({
    name: "AlexW",
    displayName: "Alex W",
    alias: "alexw",
    members: ["AlexW", "DebraB"],
    owners: ["AlexW"],
    readers: ["AlexW", "DebraB"]

  }))
process.exit(0)
}
*/
