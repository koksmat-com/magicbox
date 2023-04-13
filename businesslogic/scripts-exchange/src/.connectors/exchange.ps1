
$EXCHCERTIFICATEPASSWORD=""
$EXCHAPPID="d88f5e30-c292-4c2d-ba38-e6d8011a5ca5"
$EXCHORGANIZATION="M365x88142400.onmicrosoft.com"
$EXCHCERTIFICATEPATH = "$psscriptroot/HEXATOWNNETS.pfx"

#Connect-ExchangeOnline -CommandName New-Mailbox,Set-Mailbox,Add-MailboxPermission  -CertificateFilePath $EXCHCERTIFICATEPATH  -AppID $EXCHAPPID -Organization $EXCHORGANIZATION -ShowBanner:$false #   -BypassMailboxAnchoring:$true


Connect-ExchangeOnline  -CertificateFilePath $EXCHCERTIFICATEPATH  -AppID $EXCHAPPID -Organization $EXCHORGANIZATION -ShowBanner:$false #   -BypassMailboxAnchoring:$true
