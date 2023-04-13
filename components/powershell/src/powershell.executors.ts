import { PowerShell } from "./powershell.core";

import * as path from "path";
import * as fs from "fs";
import {
  ExecutePowerShellPNPRequestDto,
  ExecutePowerShellExchangeRequestDto,
  ExecuteMagicboxRequestDto,
} from "./powershell-request.dto";

import Debug from "debug";

const debug = Debug("PowershellService");
export class PowershellService {
  static newShell(resolve: any, reject: any): PowerShell {
    const shell = new PowerShell();

    shell.success$.subscribe((res: any) => {
      debug("Success", "PowershellService");
      shell.destroy();
      resolve(res);
    });
    shell.warning$.subscribe((res: any) => {
      debug(res, "PowershellService");
      shell.destroy();
      reject(res);
    });
    shell.verbose$.subscribe((res: any) => {
      debug(res, "PowershellService");
      shell.destroy();
      reject(res);
    });

    shell.error$.subscribe((res: any) => {
      debug(res, "PowershellService");
      shell.destroy();
      reject(res);
    });
    return shell;
  }
  executeExchange(request: ExecutePowerShellExchangeRequestDto): Promise<any> {
    return new Promise(async (resolve, reject) => {
      debug("Executing powershell", "PowershellService");
      const shell = PowershellService.newShell(resolve, reject);

      const certificate = request.appCertificate;
      const filepath = path.join(__dirname, "HEXATOWNNETS.pfx");
      fs.writeFileSync(filepath, certificate, { encoding: "base64" });
      debug(request.commands.join("\n"), "PowershellService");

      const exchangePassword = !request.appCertificatePassword
        ? ""
        : ` -CertificatePassword (ConvertTo-SecureString -String $EXCHCERTIFICATEPASSWORD -AsPlainText -Force) `;
      const x = await shell.call(`
$EXCHCERTIFICATEPASSWORD="${request.appCertificatePassword}"
$EXCHAPPID="${request.appId}"
$EXCHORGANIZATION="${request.organization}"
$EXCHCERTIFICATEPATH = "${filepath}"

Connect-ExchangeOnline -CommandName ${request.commandsNamesToLoad.join(
        ","
      )}  -CertificateFilePath $EXCHCERTIFICATEPATH ${exchangePassword} -AppID $EXCHAPPID -Organization $EXCHORGANIZATION -ShowBanner:$false #   -BypassMailboxAnchoring:$true

${request.commands.join("\n")}

Disconnect-ExchangeOnline -Confirm:$false
            `);
    });
  }
}
