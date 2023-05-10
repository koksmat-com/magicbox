# Connector: Exchange
# Commands: New-Mailbox
param (
    [Parameter(Mandatory = $true)]
    [string]$Name,
    [Parameter(Mandatory = $true)]
    [int]$capacity,
 
    [string]$prefix

 
   
)

$alias = $name.Split("(")[0].Trim().Replace(" ", "-").ToLower()
$mailbox = New-Mailbox -Name ($prefix + "room-$alias") -DisplayName "$name" -Room -ResourceCapacity  $capacity

        
write-output $mailbox.WindowsEmailAddress