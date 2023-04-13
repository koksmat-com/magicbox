
interface PowerShellRequest {
  commands : string[]
}
export interface PowerShellRequestWithCredentials extends PowerShellRequest{
  appId : string
  appDomain : string;
  appCertificate : string;
  appCertificatePassword? : string
}

export interface ExecutePowerShellExchangeRequestDto  extends PowerShellRequestWithCredentials{
commandsNamesToLoad: string[]
organization: string
}
export interface ExecuteMagicboxRequestDto {
  packname: string;
  actionname: string;
  payload: string;
}


export interface ExecutePowerShellPNPRequestDto extends PowerShellRequestWithCredentials {
  siteURL: string;
}
