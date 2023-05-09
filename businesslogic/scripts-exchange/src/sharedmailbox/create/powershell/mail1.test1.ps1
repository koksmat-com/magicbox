
$guid = New-Guid

$filename = $myinvocation.MyCommand.name
$basename = $filename.Substring(0,$filename.LastIndexOf('.'))


$result = . "$psscriptroot/index.ps1"  -Name "test-$guid" -DisplayName "Test $guid"  -Alias "test-$guid" -Members "" -Readers "" -Owner=""
$result | ConvertTo-Json

