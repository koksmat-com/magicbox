import {
  Method,
  IEndPointHandler, LifecycleEvents,
  getExampleFromOpenAPIDefinition
} from "@koksmat/powerpacks";

import { process,exchangeFields, exchangeRecords } from "@koksmat/schemas";
import PowerShell from "./powershell";
import { inputType } from "./rooms.csv";
import { IResult } from "@koksmat/core";
import { z } from "zod";

 const item = exchangeRecords.createRequest.extend({
  capacity: exchangeFields.roomCapacity,
  primarySmtpAddress: exchangeFields.smtpAddress,
  mailTip: exchangeFields.mailTip,
});
 type targetType = z.infer<typeof item>;


export default class RoomImport implements IEndPointHandler {
  events: LifecycleEvents = {};
  method: Method = "post";

  summary = "Import Rooms from Exchange";
  operationDescription = "Import Rooms from Exchange";
  resultDescription = "Process result";
  output = process.processRequestResult
  input = z.object({
    email: exchangeFields.smtpAddress
  });
  testCases = [getExampleFromOpenAPIDefinition(this.input)];
  script = new PowerShell();

  mapCSV(input: inputType): IResult<targetType> {
    const target: targetType = {
      displayName: input.DisplayName,
      name: input.Name,
      mailTip: input.MailTip,
      primarySmtpAddress: input.PrimarySmtpAddress,
      capacity: parseInt(input.ResourceCapacity),
      alias: input.Alias,
    };
    const parsedData = item.safeParse(target);
    if (!parsedData.success) {
      return { hasError: true, errorMessage: parsedData.error.message };
    } else {
      return { hasError: false, data: parsedData.data };
    }

  }
  async onPostProcessPowerShellRequest(input: inputType[]) {
    for (let index = 0; index < input.length; index++) {
      const element = input[index];

      const mapItemResult = this.mapCSV(element);
      if (mapItemResult.hasError) {
      } else {
        console.log(mapItemResult.data?.displayName, mapItemResult.data?.primarySmtpAddress);
      }
    }

  }



}
