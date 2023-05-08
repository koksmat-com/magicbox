import {
  PowerPacks,
  EndPointHandler,
  Method,
  IEndPointHandler,
  ITestCase,
  IScript,
  Events,
  LifecycleEvents,
} from "@koksmat/powerpacks";
import { z } from "zod";

import { sharedMailbox } from "@koksmat/schemas";

import Create,{IParameters as ICreateParameters} from "./create";
import Remove from "./remove";
import { PowerShellStreams } from "@koksmat/core";

export class SharedMailboxCreate implements IEndPointHandler {
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

  eventsHandlers = Events.newEventHandler();
  method: Method = "post";

  summary = "Creates a shared mailbox";
  operationDescription = "Creates a shared mailbox";
  resultDescription = "Response";

  script: IScript = new Create();
  input = {
    identity: this.constructor.name + "RequestDTO",
    schema: sharedMailbox.createRequest,
  };
  output = {
    identity: this.constructor.name + "ResponseDTO",
    schema: sharedMailbox.createRequestResult,
  };

  events: LifecycleEvents = {
    onProcess: async (input: z.infer<typeof sharedMailbox.createRequest> ) => {
      const powerShellMapper = new Create()
      const powerShellVars : ICreateParameters = {
        name: input.name,
        displayName: input.displayName,
        alias: input.alias,
        owner: input.owners,
        members: input.members,
        readers: input.readers
      }
      return powerShellMapper.mapPowerShellInput(powerShellVars)
    
    },
    onProcessed: async (input: PowerShellStreams) => {
      const target: z.infer<typeof sharedMailbox.createRequestResult> = {
        displayName: input.success[0].DisplayName,
        identity: input.success[0].Identity,
        name: input.success[0].Name,
        primarySmtpAddress: input.success[0].PrimarySmtpAddress,
      };
      return target;
    },
  };
}
export class SharedMailboxRemove implements IEndPointHandler {
  events: LifecycleEvents = {}
  testCases: ITestCase[] = [];
  eventsHandlers = Events.newEventHandler();
  method: Method = "delete";

  summary = "Deletes a shared mailbox";
  operationDescription = "Deletes a shared mailbox";
  resultDescription = "Process result";
  output = {
    identity: this.constructor.name + "ResponseDTO",
    schema: sharedMailbox.deleteRequestResult,
  };
  input = {
    identity: this.constructor.name + "RequestDTO",
    schema: sharedMailbox.deleteRequest,
  };
  script = new Remove();
}
export function register(path: string, registry: PowerPacks) {
  EndPointHandler.register(new SharedMailboxRemove(), path, registry);
  EndPointHandler.register(new SharedMailboxCreate(), path, registry);
}
