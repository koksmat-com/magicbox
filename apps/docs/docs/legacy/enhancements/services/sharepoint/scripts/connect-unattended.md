---
tags: ["Unattended","SharePoint","PowerShell"]
draft: true
---

# Connect to SharePoint Online


## 

## Ingredients

| Icon | Ingredient | Description |
| --- | --- | ---|
| | Word document | Word document with Quick Parts - the Master|
|<img style={{width:"64px"}} src="https://jumpto365.com/resources/images/Icons/SharePoint%20New.png"/> | SharePoint Document Library | Document Library to store the contract and control the metadata (variable) |
|<img style={{width:"64px"}} src="https://blob.jumpto365.com/images/default/h/e/x/hexatown.com/m/matt@hexatown.com/2022/10/Power%20Apps.png-20221023-102329.png"/> | Power App | Power App to collect data |
|<img style={{width:"64px"}} src="https://blob.jumpto365.com/images/default/h/e/x/hexatown.com/m/matt@hexatown.com/2022/10/Power%20Automate.png-20221023-102255.png"/> | Power Automate | Power Automate to create the contract |


## Using unattended credentials

You might one to test for presence of the module before loading it. This is a good practice to avoid errors when the module is not installed.

```powershell
Save-Module -Name PnP.PowerShell   -Path $PSScriptRoot 
Import-Module -Name (join-path $PSScriptRoot  "PnP.PowerShell") -DisableNameChecking

$CERTIFICATEPASSWORD="************"
$APPID="************"

#$EXCHORGANIZATION="nets.eu"
$CERTIFICATEPATH =  Join-Path $PSScriptRoot "certificate.pfx"
$SharePointUrl="https://*********.sharepoint.com/sites/xxxxxxx"
$Tenant="*********.onmicrosoft.com"

Connect-PnPOnline -ClientId $APPID -CertificatePath $CERTIFICATEPATH -CertificatePassword (ConvertTo-SecureString -AsPlainText $CERTIFICATEPASSWORD -Force) -Url $SharePointUrl -Tenant $Tenant


```