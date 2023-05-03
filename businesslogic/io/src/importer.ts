import { glob } from "glob";
import { readFileSync, mkdirSync, writeFileSync } from "fs";

import * as path from "path";
import * as fs from "fs";
import { parse } from "csv-parse";
import { IResult } from "@koksmat/core";

const parseFile = (filePath: string): Promise<IResult<any>> => {
  return new Promise(async (resolve, reject) => {
    let result: IResult<any> = { hasError: false, data: [] };
    try {
        
 
    const stream = fs.createReadStream(filePath);
    const parser = parse(
      {
        delimiter: ";",
        autoParse: true,
        autoParseDate: true,
        columns: true,
      },
      function (err, data) {
     //  console.log("parse",err,data)
        if (err) {
          result.hasError = true;
          result.errorMessage = err.message;
        } else {
          result.data = data;
        }
        stream.destroy();
      }
    );
    stream.on("error", (err) => {
   //     console.log("error",err)
      result.hasError = true;
      result.errorMessage = err.message;
      resolve(result);
    });
    stream.on("close", () => {
    //    console.log("close")
      resolve(result);
    });

    stream.pipe(parser);
} catch (error  ) {
    result.hasError = true;
    result.errorMessage = error as string;
    resolve(result);
}

  });
};
export  class Importer {
  constructor() {


  }

  async importCSV(path: string) {
    return await parseFile(path);
   
  }
}
