# Connector: Exchange
# Commands: Get-Mailbox

Get-Mailbox -Filter {recipienttypedetails -eq "SharedMailbox"} -ResultSize Unlimited | 
Select Guid, DisplayName, Alias, UserPrincipalName |
ConvertTo-Csv |
Out-File $PSScriptRoot/Mailboxes.csv