import { glob } from "glob";
import { readFileSync, mkdirSync, writeFileSync } from "fs";
import { join, extname } from "path";
import { cloneDeep } from "lodash";
import { executePowerShell } from "@koksmat/core";
import * as path from "path";
import * as fs from "fs";
import {parse} from 'csv-parse';

function camelize(str:string) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}
export const parseCSV = async () => {
  const csvFiles = await glob("**/*.csv");


  const parser = parse({delimiter: ';',autoParse:true,autoParseDate:true,to:1,columns:true}, function(err, data){
    var keyNames = Object.keys(data[0]);
console.log(keyNames);
  });
  for (let index = 0; index < csvFiles.length; index++) {
    const csvFile = csvFiles[index];
    let tsFile = csvFile.replace(".csv", ".ts");
    const fullpPath = path.resolve(__dirname, csvFile.replace("src/", ""));
    fs.createReadStream(fullpPath)
    .pipe(parser)

    console.log(csvFile);

    
   
  }
};

parseCSV(); //.then().catch().finally(process.exit())
