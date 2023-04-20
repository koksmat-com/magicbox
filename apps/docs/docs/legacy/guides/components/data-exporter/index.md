---
---

# Data Management
This recipe shows how to use the Data Management component to export data from a SharePoint list to a string formatted as a Power App expression, and how to import data by executing the expression .


## Export

### Using Excel

- Open the list in Excel
- For each row make a formula that creates a new object with the values from the row

```excel
=CONCATENATE("{""Patch(Countries"":""",A2,""",""Description"":""",B2,"""}")
```



### Using PowerApps
:::info 

This is done is the **source** environment / tenant

:::

- Create a PowerApp
- Connect the app to a Data Source
- Insert a Text Input control
- Make the control multi line
- Set the default value of the control to the following expression:

```javascript title= title="TextInput1 - Default"
Concat(
'ISO-3166-Countries-with-Regional-Codes',
"Patch(Countries,Defaults(Countries),{Title:""" & Title & """,'Data Path':""" & If(
    !IsBlank(region),
    region & "/"
) & If(
    !IsBlank('sub-region'),
    'sub-region' & "/"
) & If(
    !IsBlank('intermediate-region'),
    'intermediate-region' & "/"
) & Title & """});" & Char(13) 
)
```	

![](2022-11-25-09-04-22.png)



## Import

:::info 

This is done is the **destination** environment / tenant

:::
- Create a PowerApp
- Connect the app to a Data Source
- Insert a Button control

- Set the OnSelect value of the control to the following expression:

```javascript title="Countries (shortened for apprehension )"
Patch(Countries,Defaults(Countries),{Title:"Afghanistan",'Data Path':"Asia/Southern Asia/Afghanistan"});
Patch(Countries,Defaults(Countries),{Title:"Åland Islands",'Data Path':"Europe/Northern Europe/Åland Islands"});
Patch(Countries,Defaults(Countries),{Title:"Albania",'Data Path':"Europe/Southern Europe/Albania"});
Patch(Countries,Defaults(Countries),{Title:"Algeria",'Data Path':"Africa/Northern Africa/Algeria"});
Patch(Countries,Defaults(Countries),{Title:"American Samoa",'Data Path':"Oceania/Polynesia/American Samoa"});
Patch(Countries,Defaults(Countries),{Title:"Andorra",'Data Path':"Europe/Southern Europe/Andorra"});
```