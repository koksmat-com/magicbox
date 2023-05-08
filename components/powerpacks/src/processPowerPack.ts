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
  LifecycleEvents,
} from ".";
import debug from 'debug';
import { v4 as uuidv4 } from "uuid";
import  moment from 'moment';


export async function processPowerPack(powerpack: IEndPointHandler, rawInput: Request,returnPreview?:boolean): Promise<IResult<any>> {
    const log = debug("magicbox:businesslogic:scripts-exchange:sharedmailbox:create")

    const events = (powerpack as any).events ? (powerpack as any).events : {}
    const lifecycleEvents : LifecycleEvents = events


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


    const timestamp = (moment()).format('DD-MM-YYYYTHHmmss')
    const uuid =  timestamp + uuidv4()
    let inputVariables = ""
    if (lifecycleEvents.onProcess) {
      inputVariables = await lifecycleEvents.onProcess(input);
   
    }
    
    
  

    let script = `
    write-warning "Starting script"

    function powerbrick {
      ${powerpack.script.code}
    }
    
    ${inputVariables}

    powerbrick ${powerpack.script.mapInput}

    `
if (returnPreview){
  return {hasError:false,data:script}
}
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

    if (lifecycleEvents.onProcessed) {
      result.data = await lifecycleEvents.onProcessed(powerShellResult.data);
      
    }else{
      result.data  = powerShellResult.data.success[0]
    }

    //onProcessed
    const outputParse = powerpack.output.schema.safeParse(result.data);

    if (!outputParse.success) {
      result.hasError = true;
      result.errorMessage = JSON.parse(outputParse.error.message);
      return result;
    }

    result.data = outputParse.data;

  
    return result;
  }