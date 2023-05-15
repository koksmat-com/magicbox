import {
  IEndPointHandler,
  getExampleFromOpenAPIDefinition,
} from "@koksmat/powerpacks";
import { z } from "zod";
import { exchangeFields, exchangeRecords } from "@koksmat/schemas";
import PowerShell, { IParameters } from "./powershell";
import { PowerShellStreams } from "@koksmat/core";

export default class SharedMailboxCreate implements IEndPointHandler {
  summary = "Creates a shared mailbox";
  operationDescription = "Creates a shared mailbox";
  resultDescription = "Response";

  script = new PowerShell();
  input = exchangeRecords.createRequest.extend({
    owners: exchangeFields.owners,
    members: exchangeFields.members,
    readers: exchangeFields.readers,
  });

  output = exchangeRecords.createRequestResult.extend({
    primarySmtpAddress: exchangeFields.smtpAddress,
  });

  testCases = [getExampleFromOpenAPIDefinition(this.input)];
  events = {
    onProcess: async (input: z.infer<typeof this.input>) => {
      const powerShellVars: IParameters = {
        name: input.name,
        displayName: input.displayName,
        alias: input.alias,
        owner: input.owners,
        members: input.members,
        readers: input.readers,
      };
      const powerShellMapper = new PowerShell();
      return powerShellMapper.mapPowerShellInput(powerShellVars);
    },
    onProcessed: async (output: PowerShellStreams) => {
      const target: z.infer<typeof this.output> = {
        displayName: output.success[0].DisplayName,
        identity: output.success[0].Identity,
        name: output.success[0].Name,
        primarySmtpAddress: output.success[0].PrimarySmtpAddress,
      };
      return target;
    },
  };
}
