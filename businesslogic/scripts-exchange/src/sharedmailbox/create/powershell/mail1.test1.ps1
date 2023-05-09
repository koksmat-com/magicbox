
$guid = New-Guid

$filename = $myinvocation.MyCommand.name
$basename = $filename.Substring(0,$filename.LastIndexOf('.'))


$result = . "$psscriptroot/index.ps1"  -Name "test5-$guid" -DisplayName "Test5 $guid"  -Alias "test5-$guid" -Members "s" -Readers "s" -Owner="s"
$result | ConvertTo-Json

