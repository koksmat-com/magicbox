import { Command } from "commander";

import * as fs from "fs";
import path from "path";
import chalk from "chalk";
import { ExcelUtility } from "@koksmat/utils";
import debug from "debug";
import * as Excel from "exceljs";

export default function register(name: string, program: Command): void {
  program
    .command(name)
    .description("Parse Excel Organisation data")
    .argument("filename", "Excel file")
    .argument("type", "Type")
    .argument("output", "JSON file to save to ")
    .option("--companyname [name]", "Company name")
    .action(async (filename, type, output, options) => {
      //const options = program.opts();
      const logger = debug("magicbox.cli");
      logger("Path name", process.cwd());
      logger("Reading file", filename);
      const workbook = new Excel.Workbook();
      await workbook.xlsx.readFile(filename);
      const utility = new ExcelUtility();


      let result = "";
     
      switch (type?.toLowerCase()) {
        case "org":
          logger("Parsing org");
          console.log(chalk.gray("Parsing org"));
          result = await utility.extractOrganisationalData(
            workbook,
            options.companyname
          );
          break;
        case "sheets":
          logger("Parsing sheets");
          console.log(chalk.gray("Parsing sheets"));
          result = await utility.extractSheets(
            workbook
          );
          break;

        default:
          console.log(chalk.red("Unknown type"), chalk.yellowBright(type));
          logger("Done");
          process.exit(1);
          break;
      }

      logger("Writing to file", output);
      console.log(chalk.grey("Writing to file"),chalk.yellow(output));

      fs.writeFileSync(output, result);
      console.log(chalk.green("Done"));
      logger("Done");
      process.exit(0);
    });
}
