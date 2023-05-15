# Connector: Exchange
# Commands: Remove-Mailbox 
param (
    $smtpAddress
)

Remove-Mailbox -Identity $smtpAddress -Confirm:$false
write-output "done"