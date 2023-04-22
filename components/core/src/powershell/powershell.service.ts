import { executePowerShell, IPowerShellResult } from ".";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import * as path from "path";
import * as fs from "fs";
import z from "zod";
import debug from "debug";
import { Files } from "src/Files";
import { IResult } from "src/IResult";
extendZodWithOpenApi(z);

const exchangePowerShellRequest = z.object({
  commandsToLoad: z
    .string()
    .array()
    .openapi({ example: ["get-mailbox", "update-mailbox"] }),
  script: z.string().openapi({ example: "get-mailbox -resultsize 10" }),
  certificate: z
    .string()
    .openapi({
      description: "Base64 encoded certificate",
      example: "kjlasdfi87zxzlkd...",
    }),
  cerficatePassword: z.string().optional().openapi({ example: "password" }),
  appId: z
    .string()
    .uuid()
    .openapi({ example: "923ff24d-49b6-44db-8d5a-84dd8f7cfa28" }),
  appSecret: z.string().openapi({ example: "asdfiopxcv!sd8" }),
  organization: z
    .string()
    .openapi({ example: "M355x65867376.onmicrosoft.com" }),
});

const genericPowerShellRequest = z.object({
  script: z.string().openapi({ example: "$x = 1+2\nwrite-output $x" }),
});

const azureCLIShellRequest = z.object({
  certificate: z
    .string()
    .openapi({
      description: "Base64 encoded certificate",
      example: "kjlasdfi87zxzlkd...",
    }),
  cerficatePassword: z.string().optional().openapi({ example: "password" }),
  appId: z
    .string()
    .uuid()
    .openapi({ example: "923ff24d-49b6-44db-8d5a-84dd8f7cfa28" }),
  appSecret: z.string().openapi({ example: "asdfiopxcv!sd8" }),
  tenantId: z
    .string()
    .uuid()
    .openapi({ example: "923ff24d-49b6-44db-8d5a-84dd8f7cfa28" }),
  script: z.string().openapi({ example: "get-pnpsiteinfo" }),
});

const powerAppsPowerShellRequest = z.object({
  siteURL: z
    .string()

    .openapi({ example: "https://xxxyyyzzz.sharepoint.com" }),
  certificate: z
    .string()
    .openapi({
      description: "Base64 encoded certificate",
      example: "kjlasdfi87zxzlkd...",
    }),
  appSecret: z.string().openapi({ example: "password" }),
  appId: z
    .string()
    .uuid()
    .openapi({ example: "923ff24d-49b6-44db-8d5a-84dd8f7cfa28" }),
  tenantId: z
    .string()
    .uuid()
    .openapi({ example: "923ff24d-49b6-44db-8d5a-84dd8f7cfa28" }),
  script: z.string().openapi({ example: "get-pnpsiteinfo" }),
});
const pnpPowerShellRequest = z.object({
  siteURL: z
    .string()

    .openapi({ example: "https://xxxyyyzzz.sharepoint.com" }),
  certificate: z
    .string()
    .openapi({
      description: "Base64 encoded certificate",
      example: "kjlasdfi87zxzlkd...",
    }),
  cerficatePassword: z.string().optional().openapi({ example: "password" }),
  appId: z
    .string()
    .uuid()
    .openapi({ example: "923ff24d-49b6-44db-8d5a-84dd8f7cfa28" }),
  tenantId: z
    .string()
    .uuid()
    .openapi({ example: "923ff24d-49b6-44db-8d5a-84dd8f7cfa28" }),
  script: z.string().openapi({ example: "get-pnpsiteinfo" }),
});
export class PowershellService {
  private _log: any = debug("powershell.service");

  async executeExchange(
    requestParameters: z.infer<typeof exchangePowerShellRequest>
  ): Promise<IResult<any>> {
    this._log("Executing powershell", "PowershellService");
    const parseResult = exchangePowerShellRequest.safeParse(requestParameters);
    if (!parseResult.success) {
      return {hasError:true,errorMessage:parseResult.error.message};
    }

    const certificate = requestParameters.certificate;
    const tempPath = Files.createTempDir();
    const filepath = path.join(tempPath, "HEXATOWNNETS.pfx");
    fs.writeFileSync(filepath, certificate, { encoding: "base64" });
    this._log(requestParameters.commandsToLoad, "PowershellService");

    const exchangePassword = !requestParameters.cerficatePassword
      ? ""
      : ` -CertificatePassword (ConvertTo-SecureString -String $EXCHCERTIFICATEPASSWORD -AsPlainText -Force) `;
    const script = `
$EXCHCERTIFICATEPASSWORD="${requestParameters.cerficatePassword}"
$EXCHAPPID="${requestParameters.appId}"
$EXCHORGANIZATION="${requestParameters.organization}"
$EXCHCERTIFICATEPATH = "${filepath}"

Connect-ExchangeOnline -CommandName ${requestParameters.commandsToLoad.join(
      ","
    )}  -CertificateFilePath $EXCHCERTIFICATEPATH ${exchangePassword} -AppID $EXCHAPPID -Organization $EXCHORGANIZATION -ShowBanner:$false #   -BypassMailboxAnchoring:$true

${requestParameters.script}

Disconnect-ExchangeOnline -Confirm:$false
            `;
    const result = await executePowerShell(script);
    fs.rmSync(tempPath, { recursive: true, force: true });

    return {hasError:false,data:result};
  }

  async executePowerAdmin(
    requestParameters: z.infer<typeof powerAppsPowerShellRequest>
  ): Promise<IPowerShellResult> {
    this._log("Executing powershell", "PowershellService");

    const certificate = process.env.EXCHCERTIFICATE as string;
    const tempPath = Files.createTempDir();
    const filepath = path.join(tempPath, "HEXATOWNNETS.pfx");
    fs.writeFileSync(filepath, certificate, { encoding: "base64" });

    const script = `


$EXCHAPPID="${requestParameters.appId}}"

$EXCHCERTIFICATEPATH = "${filepath}"
$EXCHAPPSECRET="${requestParameters.appSecret}}"
$EXCHTENANTID="${requestParameters.tenantId}}"
Add-PowerAppsAccount   -Endpoint "prod"   -TenantID "$EXCHTENANTID"   -ClientSecret "$EXCHAPPSECRET"   -ApplicationId "$EXCHAPPID" 


${requestParameters.script}


            `;
    return executePowerShell(script);
  }
  async executeAZ(
    requestParameters: z.infer<typeof azureCLIShellRequest>
  ): Promise<any> {
    this._log("Executing powershell", "PowershellService");

    const certificate = requestParameters.certificate;
    const tempPath = Files.createTempDir();
    const filepath = path.join(tempPath, "HEXATOWNNETS.pfx");
    fs.writeFileSync(filepath, certificate, { encoding: "base64" });
    this._log(requestParameters.script, "PowershellService");
    const script = `

      $EXCHCERTIFICATEPASSWORD="${requestParameters.cerficatePassword}"     
      $EXCHAPPID="${requestParameters.appId}}"
    
      $EXCHCERTIFICATEPATH = "${filepath}"
      $EXCHAPPSECRET="${requestParameters.appSecret}}"
      $EXCHTENANTID="${requestParameters.tenantId}}"
az login --service-principal -u "$EXCHAPPID" -p "$EXCHAPPSECRET" --tenant "$EXCHTENANTID"

${requestParameters.script}


            `;
    const result = await executePowerShell(script);
    fs.rmSync(tempPath, { recursive: true, force: true });

    return result;
  }

  async executePNP(
    requestParameters: z.infer<typeof pnpPowerShellRequest>
  ): Promise<any> {
    this._log("Executing powershell", "PowershellService");

    const certificate = requestParameters.certificate;
    const tempPath = Files.createTempDir();
    const filepath = path.join(tempPath, "PNP.pfx");
    fs.writeFileSync(filepath, certificate, { encoding: "base64" });
    this._log(requestParameters.script, "PowershellService");
    const script = `
$PNPCERTIFICATEPASSWORD="${requestParameters.cerficatePassword}"
$PNPAPPID="${requestParameters.appId}"
$PNPTENANTID="${requestParameters.tenantId}"
$PNPCERTIFICATEPATH = "${filepath}"

Connect-PnPOnline -Url ${requestParameters.siteURL}  -ClientId $PNPAPPID -Tenant $PNPTENANTID -CertificatePath "$PNPCERTIFICATEPATH"

${requestParameters.script}
            `;
    const result = await executePowerShell(script);
    fs.rmSync(tempPath, { recursive: true, force: true });

    return result;
  }

  executeGeneric(
    executePowerShellRequest: z.infer<typeof genericPowerShellRequest>
  ): Promise<any> {
    this._log("Executing powershell", "PowershellService");

    this._log(executePowerShellRequest.script, "PowershellService");
    return executePowerShell(executePowerShellRequest.script);
  }
}
