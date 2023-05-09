# Connector: Exchange
# Commands: Get-Mailbox


# This to ensure a predictalbe output of e.g. dates

$culture = [System.Globalization.CultureInfo]::CreateSpecificCulture("de-DE")
[System.Threading.Thread]::CurrentThread.CurrentUICulture = $culture
[System.Threading.Thread]::CurrentThread.CurrentCulture = $culture

Get-Mailbox  -ResultSize Unlimited -RecipientTypeDetails SharedMailbox
     | Select-Object -Property DisplayName,Name,MailTip, PrimarySmtpAddress,WhenCreatedUTC, Alias
    | Export-Csv -Path $PSScriptRoot/sharedmailboxes.csv -NoTypeInformation -Encoding UTF8 -UseCulture
