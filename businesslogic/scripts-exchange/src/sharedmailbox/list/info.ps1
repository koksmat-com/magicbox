$parameters = (Get-Command "$psscriptroot\index.ps1").Parameters 


foreach ($parameter in $parameters.Keys) {
 
    $value = $parameters[$parameter]
    if ($parameter -in "Verbose", "Debug", "ErrorAction", "WarningAction", "InformationAction", "ErrorVariable", "WarningVariable", "InformationVariable", "OutVariable", "OutBuffer", "PipelineVariable", "WhatIf", "Confirm"){
        continue
    }
    write-host $parameter $value.ParameterType.Name
    <# $currentItemName is the current item #>
}