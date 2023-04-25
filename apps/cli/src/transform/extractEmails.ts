import * as fs from "fs";
import { IResult } from "@koksmat/core";
import { stringify } from "csv-stringify";
import { IRecipient } from "./IRecipient";

export async function extractEmails(
  fromFile: string,
  timeStamp: string,
  toFile: string
): Promise<IResult<string>> {
  return new Promise(async (resolve) => {
    const recipients = JSON.parse(fs.readFileSync(fromFile, "utf8"));
    const columns = ["timestamp", "guid", "address"];
    const result: IResult<string> = { hasError: false };

    const data: any[] = [];

    recipients.forEach((recipient: IRecipient) => {
      data.push({
        timestamp:timeStamp,
        address:recipient.Alias.toLowerCase(),
        guid: recipient.Guid,
      });
      recipient?.EmailAddresses?.forEach((emailAddress: string) => {
        if (emailAddress.toLowerCase().startsWith("smtp:"))

        data.push({
          timestamp:timeStamp,
          address:emailAddress.toLowerCase().substring(5),
          guid: recipient.Guid,
        });
      });
    });

    await stringify(data, { header: true, columns: columns }, (err, output) => { 
      if (err) throw err;
      fs.writeFile(toFile, output, (err) => {
        if (err) throw err;
        
        result.data = "OK";
        resolve(result);
      });
    });
  });
}
