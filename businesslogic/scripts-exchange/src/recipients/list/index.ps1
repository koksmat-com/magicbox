# Connector: Exchange
# Commands: Get-Recipient 
$culture = [System.Globalization.CultureInfo]::CreateSpecificCulture("de-DE")


[System.Threading.Thread]::CurrentThread.CurrentUICulture = $culture
[System.Threading.Thread]::CurrentThread.CurrentCulture = $culture
Get-Recipient -ResultSize Unlimited |
    Select-Object -Property Name, PrimarySmtpAddress, RecipientType, RecipientTypeDetails, EmailAddresses,WhenCreatedUTC |
    Export-Csv -Path $PSScriptRoot/recipients.csv -NoTypeInformation -Encoding UTF8 -UseCulture
