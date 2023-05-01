# Connector: Exchange
# Commands: Get-Mailbox
$culture = [System.Globalization.CultureInfo]::CreateSpecificCulture("de-DE")


[System.Threading.Thread]::CurrentThread.CurrentUICulture = $culture
[System.Threading.Thread]::CurrentThread.CurrentCulture = $culture

Get-Mailbox  -ResultSize Unlimited -RecipientTypeDetails RoomMailbox 
     | Select-Object -Property Name, PrimarySmtpAddress, RecipientType, RecipientTypeDetails, EmailAddresses,WhenCreatedUTC, ResourceCapacity
    | Export-Csv -Path $PSScriptRoot/rooms.csv -NoTypeInformation -Encoding UTF8 -UseCulture
