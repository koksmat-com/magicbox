#! /usr/bin/env node

const figlet = require("figlet");
const { Command } = require("commander");
const program = new Command();

import connectorValidation from "./connector-validation";
import excel from "./excel";
import message from "./message";
import sharedmailbox from "./sharedmailbox";
import transform from "./transform";
import { CommanderError } from "commander";
import chalk from "chalk";

console.log(figlet.textSync("MagicBox"));

program.version("1.0.0").description("CLI for KOKSMAT MagicBox");

connectorValidation("validate", program);
excel("excel", program);
message("message", program);
sharedmailbox("sharedmailbox", program);
transform("transform", program);
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
