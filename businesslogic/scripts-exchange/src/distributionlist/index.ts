import {
  PowerPacks,
  EndPointHandler,
  Method,
  IEndPointHandler,
  ITestCase,
  IScript,
  Events,
  LifecycleEvents,
  getExampleFromOpenAPIDefinition,
} from "@koksmat/powerpacks";
import { z } from "zod";

import { distributionList } from "@koksmat/schemas";

import Create,{IParameters as ICreateParameters} from "./create";
import Remove from "./remove";
import { PowerShellStreams } from "@koksmat/core";

export class DistributionListCreate implements IEndPointHandler {


  
  method: Method = "post";

  summary = "Creates a DL";
  operationDescription = "Creates a DL";
  resultDescription = "Response";

  script: IScript = new Create();
  input = distributionList.createRequest
  
  output =  distributionList.createRequestResult
  testCases: ITestCase[] = [
    {
      name: "Generated from schema",
      data: getExampleFromOpenAPIDefinition(this.input)
      
    },
  ];
  events: LifecycleEvents = {
    onProcess: async (input: z.infer<typeof this.input> ) => {
      const powerShellMapper = new Create()
      const powerShellVars : ICreateParameters = {
        name: input.name,
        displayName: input.displayName,
        alias: input.alias,
        owner: input.owners,
        members: input.members

      }
      return powerShellMapper.mapPowerShellInput(powerShellVars)
    
    },
    onProcessed: async (input: PowerShellStreams) => {
      const target: z.infer<typeof this.output> = {
        displayName: input.success[0].DisplayName,
        identity: input.success[0].Identity,
        name: input.success[0].Name,
        primarySmtpAddress: input.success[0].PrimarySmtpAddress,
      };
      return target;
    },
  };
}
/*
export class DistributionListRemove implements IEndPointHandler {
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
}*/
export function register(path: string, registry: PowerPacks) {
  //EndPointHandler.register(new SharedMailboxRemove(), path, registry);
  EndPointHandler.register(new DistributionListCreate(),"post", path, registry);
}
