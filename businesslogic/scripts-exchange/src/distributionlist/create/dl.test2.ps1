$guid = New-Guid

$filename = $myinvocation.MyCommand.name
$basename = $filename.Substring(0,$filename.LastIndexOf('.'))

 . "$psscriptroot/index.ps1"  -Name "test-dl-$guid" -DisplayName "Test DL $guid"  -Alias "test-dl-$guid" -Owner "AlexW" -Members "AlexW","DebraB"  

