import z from "zod";
import { IResult, PowershellService } from "@koksmat/core";
import {
  PowerPacks,
  EndPointHandler,
  Method,
  IEndPointHandler,
  Request,
  Response,
  IScript,
} from ".";
import debug from 'debug';
import { v4 as uuidv4 } from "uuid";

export async function processPowerPack(powerpack: IEndPointHandler, rawInput: Request): Promise<IResult<any>> {
    const log = debug("magicbox:businesslogic:scripts-exchange:sharedmailbox:create")
    let result: IResult<z.infer<typeof powerpack.output.schema>> = {
      hasError: false,
    };
    const zodParse = powerpack.input.schema.safeParse(rawInput.body);
    if (!zodParse.success) {
      result.hasError = true;
      result.errorMessage = JSON.parse(zodParse.error.message);
      return result;
    }
    const input = zodParse.data;
    const shell = new PowershellService();
    const uuid = uuidv4()
  

    let script = `
    write-warning "Starting script"

    function powerbrick {
      ${powerpack.script.code}
    }

    powerbrick -Name "test${uuid}" -DisplayName "test${uuid}" -Alias "test${uuid}" -Owner "test" -Members "test" -Readers "test"

    `

   const powerShellResult = await shell.executeExchange({
      commandsToLoad: powerpack.script.commands,
      script,
      certificate: process.env.EXCHCERTIFICATE as string,
      appId: process.env.EXCHAPPID as string,
      appSecret: "x",
      organization: process.env.EXCHORGANIZATION as string,
    });
    

    if (powerShellResult.hasError) {
      return powerShellResult
    }

    if (powerShellResult.data.error.length>0) {
      result.hasError = true;
      result.errorMessage = powerShellResult.data.error[0];
      return result;

    }
    
    // const outputParse = powerpack.output.schema.safeParse(powerShellResult.data.success[0]);

    // if (!outputParse.success) {
    //   result.hasError = true;
    //   result.errorMessage = JSON.parse(outputParse.error.message);
    //   return result;
    // }

    // result.data = outputParse.data;

    result.data  = powerShellResult.data.success[0]
    return result;
  }