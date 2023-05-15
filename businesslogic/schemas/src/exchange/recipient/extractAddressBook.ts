import * as fs from "fs";
import { IResult } from "@koksmat/core";
import { stringify } from "csv-stringify";
export interface IRecipient {
  Id: string;
  Guid: string;
  Alias: string;
  RecipientTypeDetails: string;
  EmailAddresses: string[];
  DisplayName: string;
  DistinguishedName: string;
}


export async function extractAddressBook(
  fromFile: string,
  timeStamp: string,
  toFile: string
): Promise<IResult<string>> {
  return new Promise(async (resolve) => {
    const result: IResult<string> = { hasError: false };
    const recipients = JSON.parse(fs.readFileSync(fromFile, "utf8"));
    const columns = [
      "timestamp",
      "id",
      "guid",
      "alias",
      "recipientTypeDetails",
      "displayName",
    ];

    const data = recipients.map((recipient: IRecipient) => {
      return {
        timestamp: timeStamp,
        id: recipient.Id,
        guid: recipient.Guid,
        alias: recipient.Alias,
        recipientTypeDetails: recipient.RecipientTypeDetails,
        displayName: recipient.DisplayName,
      };
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
