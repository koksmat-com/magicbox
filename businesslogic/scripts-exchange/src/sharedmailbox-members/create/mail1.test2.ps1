$guid = New-Guid

$filename = $myinvocation.MyCommand.name
$basename = $filename.Substring(0,$filename.LastIndexOf('.'))

$result = . "$psscriptroot/index.ps1"  -Name "test-$guid" -DisplayName "Test $guid"  -Alias "test-$guid" -Owner "AlexW" -Members "AlexW","DebraB" -Readers "AllanD" 

Out-File -FilePath "$psscriptroot/../../../../.testdata/$basename.out.json" -InputObject ($result | ConvertTo-Json)