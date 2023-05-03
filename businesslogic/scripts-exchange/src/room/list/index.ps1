# Connector: Exchange
# Commands: Get-Mailbox
# Outputs: rooms.csv


# This to ensure a predictalbe output of e.g. dates

$culture = [System.Globalization.CultureInfo]::CreateSpecificCulture("de-DE")
[System.Threading.Thread]::CurrentThread.CurrentUICulture = $culture
[System.Threading.Thread]::CurrentThread.CurrentCulture = $culture

Get-Mailbox  -ResultSize Unlimited -RecipientTypeDetails RoomMailbox 
     | Select-Object -Property DisplayName,Name,MailTip,ResourceType, PrimarySmtpAddress,WhenCreatedUTC, ResourceCapacity, Alias
    | Export-Csv -Path $PSScriptRoot/rooms.csv -NoTypeInformation -Encoding UTF8 -UseCulture
#| fl