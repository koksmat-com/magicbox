import {Command} from "commander"

import fs from "fs"
import path from "path"
import chalk from "chalk";
import {PowershellService  } from "@koksmat/core"
import debug from "debug"
export default function register(name:string,program:Command) : void{
    
program.command(name)
   .description('Validate Connector')
   .argument('connector', 'Connector to validate')
  
   .action(async (connector, options) => {
      

      const shell = new PowershellService()
      const logger = debug("magicbox.cli.validation")
      console.log(chalk.green("Validating Connector",connector))
      let result = null
      
      switch (connector.toLowerCase()) {
         case "exchange": 
            logger("Exchange Verification")
            result = await shell.executeExchange({
               commandsToLoad: ["get-mailbox"],
               script: "get-mailbox -resultsize 1 | select *name*",
               certificate: process.env.EXCHCERTIFICATE as string,
               appId: process.env.EXCHAPPID as string,
               appSecret: "x",
               organization: process.env.EXCHORGANIZATION as string,
            })
            console.log(chalk.whiteBright("Exchange First mailbox"))
            console.log(chalk.yellowBright((result.success[0] as any)?.UserPrincipalName))
            logger("Exchange Result",result)
            break;
      
         default:
            break;
      }
      process.exit(0 )
   });


}