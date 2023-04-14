
    /*
    Generated by pack.ts
    */
import {IScript} from "@koksmat/powerpacks"


export interface IParameters {
  smtpAddress : any
}
export default class Script implements IScript{
  
  public get code() : string {
    return `# Connector: Exchange
# Commands: Remove-Mailbox 
param (
    $smtpAddress
)

Remove-Mailbox -Identity $smtpAddress -Confirm:$false
write-output "done"`
  }
  public get commands() : string[] {
    return ['Remove-Mailbox']
  }
}
    