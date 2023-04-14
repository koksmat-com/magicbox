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
    .argument("companyname", "Company Name")
    .argument("output", "JSON file to save to ")

    .action(async (filename, companyname, output) => {
      const logger = debug("magicbox.cli");
      logger("Path name", process.cwd());
      logger("Reading file", filename);
      const workbook = new Excel.Workbook();
      await workbook.xlsx.readFile(filename);
      const utility = new ExcelUtility();

      logger("Parsing");
 
      console.log(chalk.green("Parsing"));
      const result = await utility.extractOrganisationalData(
        workbook,
        companyname
      );
      logger("Writing to file",output);
      console.log(chalk.green("Write to file"));

      fs.writeFileSync(output, result);
      console.log(chalk.green("Done"));
      logger("Done");
      process.exit(0);
    });
}
