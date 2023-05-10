
$guid = New-Guid



$result = . "$psscriptroot/index.ps1" -Name $guid  -capacity 10
$result | ConvertTo-Json

