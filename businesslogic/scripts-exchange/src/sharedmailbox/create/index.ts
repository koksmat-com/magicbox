import {

  IEndPointHandler,
  ITestCase,
  IScript,

  LifecycleEvents
} from "@koksmat/powerpacks";
import { z } from "zod";
import { exchangeFields,exchangeRecords } from "@koksmat/schemas";
import PowerShell, { IParameters  } from "./powershell";
import { PowerShellStreams } from "@koksmat/core";


export default class SharedMailboxCreate implements IEndPointHandler {
  testCases: ITestCase[] = [
    {
      name: "Create shared mailbox",
      data: {
        name: "mailbox2-name",
        displayName: "Mailbox 2 Name",
        alias: "mailbox2-alias",
        owners: ['AlexW'],
        members: ['AlexW'],
        readers: ['DebraB'],
      },
    },
  ];




  summary = "Creates a shared mailbox";
  operationDescription = "Creates a shared mailbox";
  resultDescription = "Response";

  script: IScript = new PowerShell();
  input = {
    identity: this.constructor.name + "RequestDTO",
    schema: exchangeRecords.createRequest.extend({
      owners: exchangeFields.owners,
      members: exchangeFields.members,
      readers: exchangeFields.readers,
    })
  };
  output = {
    identity: this.constructor.name + "ResponseDTO",
    schema: exchangeRecords.createRequestResult.extend({
      primarySmtpAddress: exchangeFields.smtpAddress
    })
  };

  events: LifecycleEvents = {
    onProcess: async (input: z.infer<typeof this.input.schema>) => {
      const powerShellMapper = new PowerShell();
      const powerShellVars: IParameters = {
        name: input.name,
        displayName: input.displayName,
        alias: input.alias,
        owner: input.owners,
        members: input.members,
        readers: input.readers
      };
      return powerShellMapper.mapPowerShellInput(powerShellVars);

    },
    onProcessed: async (output: PowerShellStreams) => {
      const target: z.infer<typeof this.output.schema> = {
        displayName: output.success[0].DisplayName,
        identity: output.success[0].Identity,
        name: output.success[0].Name,
        primarySmtpAddress: output.success[0].PrimarySmtpAddress,
      };
      return target;
    },
  };
}
