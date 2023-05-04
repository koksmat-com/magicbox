$guid = New-Guid

$filename = $myinvocation.MyCommand.name
$basename = $filename.Substring(0,$filename.LastIndexOf('.'))

 . "$psscriptroot/index.ps1"  -Name "test-$guid" -DisplayName "Test $guid"  -Alias "test-$guid" -Owner "AlexW" -Members "AlexW","DebraB" -Readers "AllanD" 

