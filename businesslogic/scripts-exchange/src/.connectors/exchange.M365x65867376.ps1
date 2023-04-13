

$EXCHCERTIFICATEPASSWORD=""
$EXCHAPPID="a8594053-1bf1-490e-bba9-ae08e0f36bcd"
$EXCHORGANIZATION="M365x65867376.onmicrosoft.com"
$EXCHCERTIFICATEPATH = "$psscriptroot/M365x65867376.pfx"

#Connect-ExchangeOnline -CommandName New-Mailbox,Set-Mailbox,Add-MailboxPermission  -CertificateFilePath $EXCHCERTIFICATEPATH  -AppID $EXCHAPPID -Organization $EXCHORGANIZATION -ShowBanner:$false #   -BypassMailboxAnchoring:$true
Write-Host "Connecting to $EXCHORGANIZATION"

Connect-ExchangeOnline -CertificateFilePath $EXCHCERTIFICATEPATH  -AppID $EXCHAPPID -Organization $EXCHORGANIZATION # -ShowBanner:$false #   -BypassMailboxAnchoring:$true

