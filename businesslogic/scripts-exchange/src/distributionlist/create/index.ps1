# Connector: Exchange
# Commands: New-DistributionGroup,Add-DistributionGroupMember
param (
    [Parameter(Mandatory = $true)]
    [string]$Name,
    [Parameter(Mandatory = $true)]
    [string]$DisplayName,
    [Parameter(Mandatory = $true)]
    [string]$Alias,
    [Parameter(Mandatory = $true)]
    [string[]]$Owner,
    [Parameter(Mandatory = $true)]
    [string[]]$Members

)


$mailbox = New-DistributionGroup -Name $name -DisplayName $displayName -Alias $alias -ManagedBy $Owner
if ($mailbox -eq $null) {
    throw "Failed to create "
}
Start-Sleep -s 5

<#
if ($owner -ne $null -and $owner -ne "" ) {
    set-Mailbox -Identity $mailbox.ExchangeObjectId 
}
#>

if ($members -ne $null -and $members -ne "" ) {
    foreach ($member in $members) {
        Add-DistributionGroupMember -Identity $mailbox.ExchangeObjectId  -Member $member  | Out-Null
    }
}




write-output $mailbox | Select name,displayname,Identity,PrimarySmtpAddress