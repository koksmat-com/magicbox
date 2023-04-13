
$tenant = "M365x65867376.onmicrosoft.com"
Register-PnPAzureADApp `
 -ApplicationName "MagicBox" `
 -SharePointDelegatePermissions AllSites.FullControl `
 -SharePointApplicationPermissions Sites.FullControl.All `
 -GraphApplicationPermissions Group.ReadWrite.All `
 -GraphDelegatePermissions Group.ReadWrite.All `
 -Tenant $tenant -DeviceLogin -NoPopup -OutPath $psscriptroot | 
 ConvertTo-Json -Depth 100 | 
 Out-File -FilePath "$psscriptroot/$tenant.pnppowershell.json"