---
tags: ["PowerApps Component","Hierarchy","Explorer"]
---

# Explorer

To cope with lot of information, actually more than 7 (+/-2) pieces, you need to segment your information, often in multiple layers. This is called a hierarchial model.

:::info The Magical Number Seven, Plus or Minus Two

https://en.wikipedia.org/wiki/The_Magical_Number_Seven,_Plus_or_Minus_Two
:::
import KoksMate from '@site/src/components/KoksMate';

<KoksMate caption="Test">123</KoksMate>

## Ingredients

| Icon | Ingredient | Description |
| --- | --- | ---|
|<img style={{width:"64px"}} src="https://blob.jumpto365.com/images/default/h/e/x/hexatown.com/m/matt@hexatown.com/2022/10/Lists.png-20221023-101515.png"/> | List |  |
|<img style={{width:"64px"}} src="https://blob.jumpto365.com/images/default/h/e/x/hexatown.com/m/matt@hexatown.com/2022/10/Power%20Apps.png-20221023-102329.png"/> | Power App | Power App to present data |

## List
You can use any list for this purpose. What you need to do with that, is to add a column called "Data Path" as a single line of text. This column will be used to store the path to the data. The value should be made unique, similar to the combination of a folder and a file name.

When entering data into the field, use `/` as a separator. For example, if you have a list called "Countries" and you want to add a city, you would enter `Europe/United Kingdom/London` as the data path.

Create a list names `Countries` and add the following columns:

| Column Name | Description | Type | Example |
| --- | --- | --- | --- |
| *Title* | default | Text | Denmark |
| Data Path | Path | Multiple lines of text | Europe/Northern Europe/Denmark | 

You can find a copy of the list here [Jumpto365|SharePoint](https://365adm.sharepoint.com/sites/data-recipes/Lists/Countries)

## Power App

Assuming that the list you have the data in is called `Countries` and that the field has been named `Data Path`, you can use the following code to extract the data in a hierarchical manner:

In this
```javascript FirstScreen.OnVisible
Clear(TL1);ForAll(Countries,If(!IsBlank('Data Path'),Collect(TL1,{Path:Concat(FirstN(Split('Data Path',"/"),1),"/"&Result),Level:Last(FirstN(Split('Data Path',"/"),1)).Result})));ClearCollect(Level1, DropColumns(GroupBy(TL1,"Level","Path","Fields"),"Fields"));
Clear(TL2);ForAll(Countries,If(!IsBlank('Data Path'),Collect(TL2,{Path:Concat(FirstN(Split('Data Path',"/"),2),"/"&Result),Level:Last(FirstN(Split('Data Path',"/"),2)).Result})));ClearCollect(Level2, DropColumns(GroupBy(TL2,"Level","Path","Fields"),"Fields"));
Clear(TL3);ForAll(Countries,If(!IsBlank('Data Path'),Collect(TL3,{Path:Concat(FirstN(Split('Data Path',"/"),3),"/"&Result),Level:Last(FirstN(Split('Data Path',"/"),3)).Result})));ClearCollect(Level3, DropColumns(GroupBy(TL3,"Level","Path","Fields"),"Fields"));
Clear(TL4);ForAll(Countries,If(!IsBlank('Data Path'),Collect(TL4,{Path:Concat(FirstN(Split('Data Path',"/"),4),"/"&Result),Level:Last(FirstN(Split('Data Path',"/"),4)).Result})));ClearCollect(Level4, DropColumns(GroupBy(TL4,"Level","Path","Fields"),"Fields"));

```

## Sample app
### List

### Data Source

https://github.com/lukes/ISO-3166-Countries-with-Regional-Codes/blob/master/all/all.csv

```javascript
Patch(Countries,Defaults(Countries),{Title:"Afghanistan",'Data Path':"Asia/Southern Asia/Afghanistan"});
Patch(Countries,Defaults(Countries),{Title:"Åland Islands",'Data Path':"Europe/Northern Europe/Åland Islands"});
Patch(Countries,Defaults(Countries),{Title:"Albania",'Data Path':"Europe/Southern Europe/Albania"});
Patch(Countries,Defaults(Countries),{Title:"Algeria",'Data Path':"Africa/Northern Africa/Algeria"});
Patch(Countries,Defaults(Countries),{Title:"American Samoa",'Data Path':"Oceania/Polynesia/American Samoa"});
Patch(Countries,Defaults(Countries),{Title:"Andorra",'Data Path':"Europe/Southern Europe/Andorra"});
Patch(Countries,Defaults(Countries),{Title:"Angola",'Data Path':"Africa/Sub-Saharan Africa/Middle Africa/Angola"});
Patch(Countries,Defaults(Countries),{Title:"Anguilla",'Data Path':"Americas/Latin America and the Caribbean/Caribbean/Anguilla"});
Patch(Countries,Defaults(Countries),{Title:"Antarctica",'Data Path':"Antarctica"});
Patch(Countries,Defaults(Countries),{Title:"Antigua and Barbuda",'Data Path':"Americas/Latin America and the Caribbean/Caribbean/Antigua and Barbuda"});
Patch(Countries,Defaults(Countries),{Title:"Argentina",'Data Path':"Americas/Latin America and the Caribbean/South America/Argentina"});
Patch(Countries,Defaults(Countries),{Title:"Armenia",'Data Path':"Asia/Western Asia/Armenia"});
Patch(Countries,Defaults(Countries),{Title:"Aruba",'Data Path':"Americas/Latin America and the Caribbean/Caribbean/Aruba"});
Patch(Countries,Defaults(Countries),{Title:"Australia",'Data Path':"Oceania/Australia and New Zealand/Australia"});
Patch(Countries,Defaults(Countries),{Title:"Austria",'Data Path':"Europe/Western Europe/Austria"});
Patch(Countries,Defaults(Countries),{Title:"Azerbaijan",'Data Path':"Asia/Western Asia/Azerbaijan"});
Patch(Countries,Defaults(Countries),{Title:"Bahamas",'Data Path':"Americas/Latin America and the Caribbean/Caribbean/Bahamas"});
Patch(Countries,Defaults(Countries),{Title:"Bahrain",'Data Path':"Asia/Western Asia/Bahrain"});
Patch(Countries,Defaults(Countries),{Title:"Bangladesh",'Data Path':"Asia/Southern Asia/Bangladesh"});
Patch(Countries,Defaults(Countries),{Title:"Barbados",'Data Path':"Americas/Latin America and the Caribbean/Caribbean/Barbados"});
Patch(Countries,Defaults(Countries),{Title:"Belarus",'Data Path':"Europe/Eastern Europe/Belarus"});
Patch(Countries,Defaults(Countries),{Title:"Belgium",'Data Path':"Europe/Western Europe/Belgium"});
Patch(Countries,Defaults(Countries),{Title:"Belize",'Data Path':"Americas/Latin America and the Caribbean/Central America/Belize"});
Patch(Countries,Defaults(Countries),{Title:"Benin",'Data Path':"Africa/Sub-Saharan Africa/Western Africa/Benin"});
Patch(Countries,Defaults(Countries),{Title:"Bermuda",'Data Path':"Americas/Northern America/Bermuda"});
Patch(Countries,Defaults(Countries),{Title:"Bhutan",'Data Path':"Asia/Southern Asia/Bhutan"});
Patch(Countries,Defaults(Countries),{Title:"Bolivia (Plurinational State of)",'Data Path':"Americas/Latin America and the Caribbean/South America/Bolivia (Plurinational State of)"});
Patch(Countries,Defaults(Countries),{Title:"Bonaire, Sint Eustatius and Saba",'Data Path':"Americas/Latin America and the Caribbean/Caribbean/Bonaire, Sint Eustatius and Saba"});
Patch(Countries,Defaults(Countries),{Title:"Bosnia and Herzegovina",'Data Path':"Europe/Southern Europe/Bosnia and Herzegovina"});
Patch(Countries,Defaults(Countries),{Title:"Botswana",'Data Path':"Africa/Sub-Saharan Africa/Southern Africa/Botswana"});
Patch(Countries,Defaults(Countries),{Title:"Bouvet Island",'Data Path':"Americas/Latin America and the Caribbean/South America/Bouvet Island"});
Patch(Countries,Defaults(Countries),{Title:"Brazil",'Data Path':"Americas/Latin America and the Caribbean/South America/Brazil"});
Patch(Countries,Defaults(Countries),{Title:"British Indian Ocean Territory",'Data Path':"Africa/Sub-Saharan Africa/Eastern Africa/British Indian Ocean Territory"});
Patch(Countries,Defaults(Countries),{Title:"Brunei Darussalam",'Data Path':"Asia/South-eastern Asia/Brunei Darussalam"});
Patch(Countries,Defaults(Countries),{Title:"Bulgaria",'Data Path':"Europe/Eastern Europe/Bulgaria"});
Patch(Countries,Defaults(Countries),{Title:"Burkina Faso",'Data Path':"Africa/Sub-Saharan Africa/Western Africa/Burkina Faso"});
Patch(Countries,Defaults(Countries),{Title:"Burundi",'Data Path':"Africa/Sub-Saharan Africa/Eastern Africa/Burundi"});
Patch(Countries,Defaults(Countries),{Title:"Cabo Verde",'Data Path':"Africa/Sub-Saharan Africa/Western Africa/Cabo Verde"});
Patch(Countries,Defaults(Countries),{Title:"Cambodia",'Data Path':"Asia/South-eastern Asia/Cambodia"});
Patch(Countries,Defaults(Countries),{Title:"Cameroon",'Data Path':"Africa/Sub-Saharan Africa/Middle Africa/Cameroon"});
Patch(Countries,Defaults(Countries),{Title:"Canada",'Data Path':"Americas/Northern America/Canada"});
Patch(Countries,Defaults(Countries),{Title:"Cayman Islands",'Data Path':"Americas/Latin America and the Caribbean/Caribbean/Cayman Islands"});
Patch(Countries,Defaults(Countries),{Title:"Central African Republic",'Data Path':"Africa/Sub-Saharan Africa/Middle Africa/Central African Republic"});
Patch(Countries,Defaults(Countries),{Title:"Chad",'Data Path':"Africa/Sub-Saharan Africa/Middle Africa/Chad"});
Patch(Countries,Defaults(Countries),{Title:"Chile",'Data Path':"Americas/Latin America and the Caribbean/South America/Chile"});
Patch(Countries,Defaults(Countries),{Title:"China",'Data Path':"Asia/Eastern Asia/China"});
Patch(Countries,Defaults(Countries),{Title:"Christmas Island",'Data Path':"Oceania/Australia and New Zealand/Christmas Island"});
Patch(Countries,Defaults(Countries),{Title:"Cocos (Keeling) Islands",'Data Path':"Oceania/Australia and New Zealand/Cocos (Keeling) Islands"});
Patch(Countries,Defaults(Countries),{Title:"Colombia",'Data Path':"Americas/Latin America and the Caribbean/South America/Colombia"});
Patch(Countries,Defaults(Countries),{Title:"Comoros",'Data Path':"Africa/Sub-Saharan Africa/Eastern Africa/Comoros"});
Patch(Countries,Defaults(Countries),{Title:"Congo",'Data Path':"Africa/Sub-Saharan Africa/Middle Africa/Congo"});
Patch(Countries,Defaults(Countries),{Title:"Congo, Democratic Republic of the",'Data Path':"Africa/Sub-Saharan Africa/Middle Africa/Congo, Democratic Republic of the"});
Patch(Countries,Defaults(Countries),{Title:"Cook Islands",'Data Path':"Oceania/Polynesia/Cook Islands"});
Patch(Countries,Defaults(Countries),{Title:"Costa Rica",'Data Path':"Americas/Latin America and the Caribbean/Central America/Costa Rica"});
Patch(Countries,Defaults(Countries),{Title:"Côte d'Ivoire",'Data Path':"Africa/Sub-Saharan Africa/Western Africa/Côte d'Ivoire"});
Patch(Countries,Defaults(Countries),{Title:"Croatia",'Data Path':"Europe/Southern Europe/Croatia"});
Patch(Countries,Defaults(Countries),{Title:"Cuba",'Data Path':"Americas/Latin America and the Caribbean/Caribbean/Cuba"});
Patch(Countries,Defaults(Countries),{Title:"Curaçao",'Data Path':"Americas/Latin America and the Caribbean/Caribbean/Curaçao"});
Patch(Countries,Defaults(Countries),{Title:"Cyprus",'Data Path':"Asia/Western Asia/Cyprus"});
Patch(Countries,Defaults(Countries),{Title:"Czechia",'Data Path':"Europe/Eastern Europe/Czechia"});
Patch(Countries,Defaults(Countries),{Title:"Denmark",'Data Path':"Europe/Northern Europe/Denmark"});
Patch(Countries,Defaults(Countries),{Title:"Djibouti",'Data Path':"Africa/Sub-Saharan Africa/Eastern Africa/Djibouti"});
Patch(Countries,Defaults(Countries),{Title:"Dominica",'Data Path':"Americas/Latin America and the Caribbean/Caribbean/Dominica"});
Patch(Countries,Defaults(Countries),{Title:"Dominican Republic",'Data Path':"Americas/Latin America and the Caribbean/Caribbean/Dominican Republic"});
Patch(Countries,Defaults(Countries),{Title:"Ecuador",'Data Path':"Americas/Latin America and the Caribbean/South America/Ecuador"});
Patch(Countries,Defaults(Countries),{Title:"Egypt",'Data Path':"Africa/Northern Africa/Egypt"});
Patch(Countries,Defaults(Countries),{Title:"El Salvador",'Data Path':"Americas/Latin America and the Caribbean/Central America/El Salvador"});
Patch(Countries,Defaults(Countries),{Title:"Equatorial Guinea",'Data Path':"Africa/Sub-Saharan Africa/Middle Africa/Equatorial Guinea"});
Patch(Countries,Defaults(Countries),{Title:"Eritrea",'Data Path':"Africa/Sub-Saharan Africa/Eastern Africa/Eritrea"});
Patch(Countries,Defaults(Countries),{Title:"Estonia",'Data Path':"Europe/Northern Europe/Estonia"});
Patch(Countries,Defaults(Countries),{Title:"Eswatini",'Data Path':"Africa/Sub-Saharan Africa/Southern Africa/Eswatini"});
Patch(Countries,Defaults(Countries),{Title:"Ethiopia",'Data Path':"Africa/Sub-Saharan Africa/Eastern Africa/Ethiopia"});
Patch(Countries,Defaults(Countries),{Title:"Falkland Islands (Malvinas)",'Data Path':"Americas/Latin America and the Caribbean/South America/Falkland Islands (Malvinas)"});
Patch(Countries,Defaults(Countries),{Title:"Faroe Islands",'Data Path':"Europe/Northern Europe/Faroe Islands"});
Patch(Countries,Defaults(Countries),{Title:"Fiji",'Data Path':"Oceania/Melanesia/Fiji"});
Patch(Countries,Defaults(Countries),{Title:"Finland",'Data Path':"Europe/Northern Europe/Finland"});
Patch(Countries,Defaults(Countries),{Title:"France",'Data Path':"Europe/Western Europe/France"});
Patch(Countries,Defaults(Countries),{Title:"French Guiana",'Data Path':"Americas/Latin America and the Caribbean/South America/French Guiana"});
Patch(Countries,Defaults(Countries),{Title:"French Polynesia",'Data Path':"Oceania/Polynesia/French Polynesia"});
Patch(Countries,Defaults(Countries),{Title:"French Southern Territories",'Data Path':"Africa/Sub-Saharan Africa/Eastern Africa/French Southern Territories"});
Patch(Countries,Defaults(Countries),{Title:"Gabon",'Data Path':"Africa/Sub-Saharan Africa/Middle Africa/Gabon"});
Patch(Countries,Defaults(Countries),{Title:"Gambia",'Data Path':"Africa/Sub-Saharan Africa/Western Africa/Gambia"});
Patch(Countries,Defaults(Countries),{Title:"Georgia",'Data Path':"Asia/Western Asia/Georgia"});
Patch(Countries,Defaults(Countries),{Title:"Germany",'Data Path':"Europe/Western Europe/Germany"});
Patch(Countries,Defaults(Countries),{Title:"Ghana",'Data Path':"Africa/Sub-Saharan Africa/Western Africa/Ghana"});
Patch(Countries,Defaults(Countries),{Title:"Gibraltar",'Data Path':"Europe/Southern Europe/Gibraltar"});
Patch(Countries,Defaults(Countries),{Title:"Greece",'Data Path':"Europe/Southern Europe/Greece"});
Patch(Countries,Defaults(Countries),{Title:"Greenland",'Data Path':"Americas/Northern America/Greenland"});
Patch(Countries,Defaults(Countries),{Title:"Grenada",'Data Path':"Americas/Latin America and the Caribbean/Caribbean/Grenada"});
Patch(Countries,Defaults(Countries),{Title:"Guadeloupe",'Data Path':"Americas/Latin America and the Caribbean/Caribbean/Guadeloupe"});
Patch(Countries,Defaults(Countries),{Title:"Guam",'Data Path':"Oceania/Micronesia/Guam"});
Patch(Countries,Defaults(Countries),{Title:"Guatemala",'Data Path':"Americas/Latin America and the Caribbean/Central America/Guatemala"});
Patch(Countries,Defaults(Countries),{Title:"Guernsey",'Data Path':"Europe/Northern Europe/Channel Islands/Guernsey"});
Patch(Countries,Defaults(Countries),{Title:"Guinea",'Data Path':"Africa/Sub-Saharan Africa/Western Africa/Guinea"});
Patch(Countries,Defaults(Countries),{Title:"Guinea-Bissau",'Data Path':"Africa/Sub-Saharan Africa/Western Africa/Guinea-Bissau"});
Patch(Countries,Defaults(Countries),{Title:"Guyana",'Data Path':"Americas/Latin America and the Caribbean/South America/Guyana"});
Patch(Countries,Defaults(Countries),{Title:"Haiti",'Data Path':"Americas/Latin America and the Caribbean/Caribbean/Haiti"});
Patch(Countries,Defaults(Countries),{Title:"Heard Island and McDonald Islands",'Data Path':"Oceania/Australia and New Zealand/Heard Island and McDonald Islands"});
Patch(Countries,Defaults(Countries),{Title:"Holy See",'Data Path':"Europe/Southern Europe/Holy See"});
Patch(Countries,Defaults(Countries),{Title:"Honduras",'Data Path':"Americas/Latin America and the Caribbean/Central America/Honduras"});
Patch(Countries,Defaults(Countries),{Title:"Hong Kong",'Data Path':"Asia/Eastern Asia/Hong Kong"});
Patch(Countries,Defaults(Countries),{Title:"Hungary",'Data Path':"Europe/Eastern Europe/Hungary"});
Patch(Countries,Defaults(Countries),{Title:"Iceland",'Data Path':"Europe/Northern Europe/Iceland"});
Patch(Countries,Defaults(Countries),{Title:"India",'Data Path':"Asia/Southern Asia/India"});
Patch(Countries,Defaults(Countries),{Title:"Indonesia",'Data Path':"Asia/South-eastern Asia/Indonesia"});
Patch(Countries,Defaults(Countries),{Title:"Iran (Islamic Republic of)",'Data Path':"Asia/Southern Asia/Iran (Islamic Republic of)"});
Patch(Countries,Defaults(Countries),{Title:"Iraq",'Data Path':"Asia/Western Asia/Iraq"});
Patch(Countries,Defaults(Countries),{Title:"Ireland",'Data Path':"Europe/Northern Europe/Ireland"});
Patch(Countries,Defaults(Countries),{Title:"Isle of Man",'Data Path':"Europe/Northern Europe/Isle of Man"});
Patch(Countries,Defaults(Countries),{Title:"Israel",'Data Path':"Asia/Western Asia/Israel"});
Patch(Countries,Defaults(Countries),{Title:"Italy",'Data Path':"Europe/Southern Europe/Italy"});
Patch(Countries,Defaults(Countries),{Title:"Jamaica",'Data Path':"Americas/Latin America and the Caribbean/Caribbean/Jamaica"});
Patch(Countries,Defaults(Countries),{Title:"Japan",'Data Path':"Asia/Eastern Asia/Japan"});
Patch(Countries,Defaults(Countries),{Title:"Jersey",'Data Path':"Europe/Northern Europe/Channel Islands/Jersey"});
Patch(Countries,Defaults(Countries),{Title:"Jordan",'Data Path':"Asia/Western Asia/Jordan"});
Patch(Countries,Defaults(Countries),{Title:"Kazakhstan",'Data Path':"Asia/Central Asia/Kazakhstan"});
Patch(Countries,Defaults(Countries),{Title:"Kenya",'Data Path':"Africa/Sub-Saharan Africa/Eastern Africa/Kenya"});
Patch(Countries,Defaults(Countries),{Title:"Kiribati",'Data Path':"Oceania/Micronesia/Kiribati"});
Patch(Countries,Defaults(Countries),{Title:"Korea (Democratic People's Republic of)",'Data Path':"Asia/Eastern Asia/Korea (Democratic People's Republic of)"});
Patch(Countries,Defaults(Countries),{Title:"Korea, Republic of",'Data Path':"Asia/Eastern Asia/Korea, Republic of"});
Patch(Countries,Defaults(Countries),{Title:"Kuwait",'Data Path':"Asia/Western Asia/Kuwait"});
Patch(Countries,Defaults(Countries),{Title:"Kyrgyzstan",'Data Path':"Asia/Central Asia/Kyrgyzstan"});
Patch(Countries,Defaults(Countries),{Title:"Lao People's Democratic Republic",'Data Path':"Asia/South-eastern Asia/Lao People's Democratic Republic"});
Patch(Countries,Defaults(Countries),{Title:"Latvia",'Data Path':"Europe/Northern Europe/Latvia"});
Patch(Countries,Defaults(Countries),{Title:"Lebanon",'Data Path':"Asia/Western Asia/Lebanon"});
Patch(Countries,Defaults(Countries),{Title:"Lesotho",'Data Path':"Africa/Sub-Saharan Africa/Southern Africa/Lesotho"});
Patch(Countries,Defaults(Countries),{Title:"Liberia",'Data Path':"Africa/Sub-Saharan Africa/Western Africa/Liberia"});
Patch(Countries,Defaults(Countries),{Title:"Libya",'Data Path':"Africa/Northern Africa/Libya"});
Patch(Countries,Defaults(Countries),{Title:"Liechtenstein",'Data Path':"Europe/Western Europe/Liechtenstein"});
Patch(Countries,Defaults(Countries),{Title:"Lithuania",'Data Path':"Europe/Northern Europe/Lithuania"});
Patch(Countries,Defaults(Countries),{Title:"Luxembourg",'Data Path':"Europe/Western Europe/Luxembourg"});
Patch(Countries,Defaults(Countries),{Title:"Macao",'Data Path':"Asia/Eastern Asia/Macao"});
Patch(Countries,Defaults(Countries),{Title:"Madagascar",'Data Path':"Africa/Sub-Saharan Africa/Eastern Africa/Madagascar"});
Patch(Countries,Defaults(Countries),{Title:"Malawi",'Data Path':"Africa/Sub-Saharan Africa/Eastern Africa/Malawi"});
Patch(Countries,Defaults(Countries),{Title:"Malaysia",'Data Path':"Asia/South-eastern Asia/Malaysia"});
Patch(Countries,Defaults(Countries),{Title:"Maldives",'Data Path':"Asia/Southern Asia/Maldives"});
Patch(Countries,Defaults(Countries),{Title:"Mali",'Data Path':"Africa/Sub-Saharan Africa/Western Africa/Mali"});
Patch(Countries,Defaults(Countries),{Title:"Malta",'Data Path':"Europe/Southern Europe/Malta"});
Patch(Countries,Defaults(Countries),{Title:"Marshall Islands",'Data Path':"Oceania/Micronesia/Marshall Islands"});
Patch(Countries,Defaults(Countries),{Title:"Martinique",'Data Path':"Americas/Latin America and the Caribbean/Caribbean/Martinique"});
Patch(Countries,Defaults(Countries),{Title:"Mauritania",'Data Path':"Africa/Sub-Saharan Africa/Western Africa/Mauritania"});
Patch(Countries,Defaults(Countries),{Title:"Mauritius",'Data Path':"Africa/Sub-Saharan Africa/Eastern Africa/Mauritius"});
Patch(Countries,Defaults(Countries),{Title:"Mayotte",'Data Path':"Africa/Sub-Saharan Africa/Eastern Africa/Mayotte"});
Patch(Countries,Defaults(Countries),{Title:"Mexico",'Data Path':"Americas/Latin America and the Caribbean/Central America/Mexico"});
Patch(Countries,Defaults(Countries),{Title:"Micronesia (Federated States of)",'Data Path':"Oceania/Micronesia/Micronesia (Federated States of)"});
Patch(Countries,Defaults(Countries),{Title:"Moldova, Republic of",'Data Path':"Europe/Eastern Europe/Moldova, Republic of"});
Patch(Countries,Defaults(Countries),{Title:"Monaco",'Data Path':"Europe/Western Europe/Monaco"});
Patch(Countries,Defaults(Countries),{Title:"Mongolia",'Data Path':"Asia/Eastern Asia/Mongolia"});
Patch(Countries,Defaults(Countries),{Title:"Montenegro",'Data Path':"Europe/Southern Europe/Montenegro"});
Patch(Countries,Defaults(Countries),{Title:"Montserrat",'Data Path':"Americas/Latin America and the Caribbean/Caribbean/Montserrat"});
Patch(Countries,Defaults(Countries),{Title:"Morocco",'Data Path':"Africa/Northern Africa/Morocco"});
Patch(Countries,Defaults(Countries),{Title:"Mozambique",'Data Path':"Africa/Sub-Saharan Africa/Eastern Africa/Mozambique"});
Patch(Countries,Defaults(Countries),{Title:"Myanmar",'Data Path':"Asia/South-eastern Asia/Myanmar"});
Patch(Countries,Defaults(Countries),{Title:"Namibia",'Data Path':"Africa/Sub-Saharan Africa/Southern Africa/Namibia"});
Patch(Countries,Defaults(Countries),{Title:"Nauru",'Data Path':"Oceania/Micronesia/Nauru"});
Patch(Countries,Defaults(Countries),{Title:"Nepal",'Data Path':"Asia/Southern Asia/Nepal"});
Patch(Countries,Defaults(Countries),{Title:"Netherlands",'Data Path':"Europe/Western Europe/Netherlands"});
Patch(Countries,Defaults(Countries),{Title:"New Caledonia",'Data Path':"Oceania/Melanesia/New Caledonia"});
Patch(Countries,Defaults(Countries),{Title:"New Zealand",'Data Path':"Oceania/Australia and New Zealand/New Zealand"});
Patch(Countries,Defaults(Countries),{Title:"Nicaragua",'Data Path':"Americas/Latin America and the Caribbean/Central America/Nicaragua"});
Patch(Countries,Defaults(Countries),{Title:"Niger",'Data Path':"Africa/Sub-Saharan Africa/Western Africa/Niger"});
Patch(Countries,Defaults(Countries),{Title:"Nigeria",'Data Path':"Africa/Sub-Saharan Africa/Western Africa/Nigeria"});
Patch(Countries,Defaults(Countries),{Title:"Niue",'Data Path':"Oceania/Polynesia/Niue"});
Patch(Countries,Defaults(Countries),{Title:"Norfolk Island",'Data Path':"Oceania/Australia and New Zealand/Norfolk Island"});
Patch(Countries,Defaults(Countries),{Title:"North Macedonia",'Data Path':"Europe/Southern Europe/North Macedonia"});
Patch(Countries,Defaults(Countries),{Title:"Northern Mariana Islands",'Data Path':"Oceania/Micronesia/Northern Mariana Islands"});
Patch(Countries,Defaults(Countries),{Title:"Norway",'Data Path':"Europe/Northern Europe/Norway"});
Patch(Countries,Defaults(Countries),{Title:"Oman",'Data Path':"Asia/Western Asia/Oman"});
Patch(Countries,Defaults(Countries),{Title:"Pakistan",'Data Path':"Asia/Southern Asia/Pakistan"});
Patch(Countries,Defaults(Countries),{Title:"Palau",'Data Path':"Oceania/Micronesia/Palau"});
Patch(Countries,Defaults(Countries),{Title:"Palestine, State of",'Data Path':"Asia/Western Asia/Palestine, State of"});
Patch(Countries,Defaults(Countries),{Title:"Panama",'Data Path':"Americas/Latin America and the Caribbean/Central America/Panama"});
Patch(Countries,Defaults(Countries),{Title:"Papua New Guinea",'Data Path':"Oceania/Melanesia/Papua New Guinea"});
Patch(Countries,Defaults(Countries),{Title:"Paraguay",'Data Path':"Americas/Latin America and the Caribbean/South America/Paraguay"});
Patch(Countries,Defaults(Countries),{Title:"Peru",'Data Path':"Americas/Latin America and the Caribbean/South America/Peru"});
Patch(Countries,Defaults(Countries),{Title:"Philippines",'Data Path':"Asia/South-eastern Asia/Philippines"});
Patch(Countries,Defaults(Countries),{Title:"Pitcairn",'Data Path':"Oceania/Polynesia/Pitcairn"});
Patch(Countries,Defaults(Countries),{Title:"Poland",'Data Path':"Europe/Eastern Europe/Poland"});
Patch(Countries,Defaults(Countries),{Title:"Portugal",'Data Path':"Europe/Southern Europe/Portugal"});
Patch(Countries,Defaults(Countries),{Title:"Puerto Rico",'Data Path':"Americas/Latin America and the Caribbean/Caribbean/Puerto Rico"});
Patch(Countries,Defaults(Countries),{Title:"Qatar",'Data Path':"Asia/Western Asia/Qatar"});
Patch(Countries,Defaults(Countries),{Title:"Réunion",'Data Path':"Africa/Sub-Saharan Africa/Eastern Africa/Réunion"});
Patch(Countries,Defaults(Countries),{Title:"Romania",'Data Path':"Europe/Eastern Europe/Romania"});
Patch(Countries,Defaults(Countries),{Title:"Russian Federation",'Data Path':"Europe/Eastern Europe/Russian Federation"});
Patch(Countries,Defaults(Countries),{Title:"Rwanda",'Data Path':"Africa/Sub-Saharan Africa/Eastern Africa/Rwanda"});
Patch(Countries,Defaults(Countries),{Title:"Saint Barthélemy",'Data Path':"Americas/Latin America and the Caribbean/Caribbean/Saint Barthélemy"});
Patch(Countries,Defaults(Countries),{Title:"Saint Helena, Ascension and Tristan da Cunha",'Data Path':"Africa/Sub-Saharan Africa/Western Africa/Saint Helena, Ascension and Tristan da Cunha"});
Patch(Countries,Defaults(Countries),{Title:"Saint Kitts and Nevis",'Data Path':"Americas/Latin America and the Caribbean/Caribbean/Saint Kitts and Nevis"});
Patch(Countries,Defaults(Countries),{Title:"Saint Lucia",'Data Path':"Americas/Latin America and the Caribbean/Caribbean/Saint Lucia"});
Patch(Countries,Defaults(Countries),{Title:"Saint Martin (French part)",'Data Path':"Americas/Latin America and the Caribbean/Caribbean/Saint Martin (French part)"});
Patch(Countries,Defaults(Countries),{Title:"Saint Pierre and Miquelon",'Data Path':"Americas/Northern America/Saint Pierre and Miquelon"});
Patch(Countries,Defaults(Countries),{Title:"Saint Vincent and the Grenadines",'Data Path':"Americas/Latin America and the Caribbean/Caribbean/Saint Vincent and the Grenadines"});
Patch(Countries,Defaults(Countries),{Title:"Samoa",'Data Path':"Oceania/Polynesia/Samoa"});
Patch(Countries,Defaults(Countries),{Title:"San Marino",'Data Path':"Europe/Southern Europe/San Marino"});
Patch(Countries,Defaults(Countries),{Title:"Sao Tome and Principe",'Data Path':"Africa/Sub-Saharan Africa/Middle Africa/Sao Tome and Principe"});
Patch(Countries,Defaults(Countries),{Title:"Saudi Arabia",'Data Path':"Asia/Western Asia/Saudi Arabia"});
Patch(Countries,Defaults(Countries),{Title:"Senegal",'Data Path':"Africa/Sub-Saharan Africa/Western Africa/Senegal"});
Patch(Countries,Defaults(Countries),{Title:"Serbia",'Data Path':"Europe/Southern Europe/Serbia"});
Patch(Countries,Defaults(Countries),{Title:"Seychelles",'Data Path':"Africa/Sub-Saharan Africa/Eastern Africa/Seychelles"});
Patch(Countries,Defaults(Countries),{Title:"Sierra Leone",'Data Path':"Africa/Sub-Saharan Africa/Western Africa/Sierra Leone"});
Patch(Countries,Defaults(Countries),{Title:"Singapore",'Data Path':"Asia/South-eastern Asia/Singapore"});
Patch(Countries,Defaults(Countries),{Title:"Sint Maarten (Dutch part)",'Data Path':"Americas/Latin America and the Caribbean/Caribbean/Sint Maarten (Dutch part)"});
Patch(Countries,Defaults(Countries),{Title:"Slovakia",'Data Path':"Europe/Eastern Europe/Slovakia"});
Patch(Countries,Defaults(Countries),{Title:"Slovenia",'Data Path':"Europe/Southern Europe/Slovenia"});
Patch(Countries,Defaults(Countries),{Title:"Solomon Islands",'Data Path':"Oceania/Melanesia/Solomon Islands"});
Patch(Countries,Defaults(Countries),{Title:"Somalia",'Data Path':"Africa/Sub-Saharan Africa/Eastern Africa/Somalia"});
Patch(Countries,Defaults(Countries),{Title:"South Africa",'Data Path':"Africa/Sub-Saharan Africa/Southern Africa/South Africa"});
Patch(Countries,Defaults(Countries),{Title:"South Georgia and the South Sandwich Islands",'Data Path':"Americas/Latin America and the Caribbean/South America/South Georgia and the South Sandwich Islands"});
Patch(Countries,Defaults(Countries),{Title:"South Sudan",'Data Path':"Africa/Sub-Saharan Africa/Eastern Africa/South Sudan"});
Patch(Countries,Defaults(Countries),{Title:"Spain",'Data Path':"Europe/Southern Europe/Spain"});
Patch(Countries,Defaults(Countries),{Title:"Sri Lanka",'Data Path':"Asia/Southern Asia/Sri Lanka"});
Patch(Countries,Defaults(Countries),{Title:"Sudan",'Data Path':"Africa/Northern Africa/Sudan"});
Patch(Countries,Defaults(Countries),{Title:"Suriname",'Data Path':"Americas/Latin America and the Caribbean/South America/Suriname"});
Patch(Countries,Defaults(Countries),{Title:"Svalbard and Jan Mayen",'Data Path':"Europe/Northern Europe/Svalbard and Jan Mayen"});
Patch(Countries,Defaults(Countries),{Title:"Sweden",'Data Path':"Europe/Northern Europe/Sweden"});
Patch(Countries,Defaults(Countries),{Title:"Switzerland",'Data Path':"Europe/Western Europe/Switzerland"});
Patch(Countries,Defaults(Countries),{Title:"Syrian Arab Republic",'Data Path':"Asia/Western Asia/Syrian Arab Republic"});
Patch(Countries,Defaults(Countries),{Title:"Taiwan, Province of China",'Data Path':"Asia/Eastern Asia/Taiwan, Province of China"});
Patch(Countries,Defaults(Countries),{Title:"Tajikistan",'Data Path':"Asia/Central Asia/Tajikistan"});
Patch(Countries,Defaults(Countries),{Title:"Tanzania, United Republic of",'Data Path':"Africa/Sub-Saharan Africa/Eastern Africa/Tanzania, United Republic of"});
Patch(Countries,Defaults(Countries),{Title:"Thailand",'Data Path':"Asia/South-eastern Asia/Thailand"});
Patch(Countries,Defaults(Countries),{Title:"Timor-Leste",'Data Path':"Asia/South-eastern Asia/Timor-Leste"});
Patch(Countries,Defaults(Countries),{Title:"Togo",'Data Path':"Africa/Sub-Saharan Africa/Western Africa/Togo"});
Patch(Countries,Defaults(Countries),{Title:"Tokelau",'Data Path':"Oceania/Polynesia/Tokelau"});
Patch(Countries,Defaults(Countries),{Title:"Tonga",'Data Path':"Oceania/Polynesia/Tonga"});
Patch(Countries,Defaults(Countries),{Title:"Trinidad and Tobago",'Data Path':"Americas/Latin America and the Caribbean/Caribbean/Trinidad and Tobago"});
Patch(Countries,Defaults(Countries),{Title:"Tunisia",'Data Path':"Africa/Northern Africa/Tunisia"});
Patch(Countries,Defaults(Countries),{Title:"Turkey",'Data Path':"Asia/Western Asia/Turkey"});
Patch(Countries,Defaults(Countries),{Title:"Turkmenistan",'Data Path':"Asia/Central Asia/Turkmenistan"});
Patch(Countries,Defaults(Countries),{Title:"Turks and Caicos Islands",'Data Path':"Americas/Latin America and the Caribbean/Caribbean/Turks and Caicos Islands"});
Patch(Countries,Defaults(Countries),{Title:"Tuvalu",'Data Path':"Oceania/Polynesia/Tuvalu"});
Patch(Countries,Defaults(Countries),{Title:"Uganda",'Data Path':"Africa/Sub-Saharan Africa/Eastern Africa/Uganda"});
Patch(Countries,Defaults(Countries),{Title:"Ukraine",'Data Path':"Europe/Eastern Europe/Ukraine"});
Patch(Countries,Defaults(Countries),{Title:"United Arab Emirates",'Data Path':"Asia/Western Asia/United Arab Emirates"});
Patch(Countries,Defaults(Countries),{Title:"United Kingdom of Great Britain and Northern Ireland",'Data Path':"Europe/Northern Europe/United Kingdom of Great Britain and Northern Ireland"});
Patch(Countries,Defaults(Countries),{Title:"United States of America",'Data Path':"Americas/Northern America/United States of America"});
Patch(Countries,Defaults(Countries),{Title:"United States Minor Outlying Islands",'Data Path':"Oceania/Micronesia/United States Minor Outlying Islands"});
Patch(Countries,Defaults(Countries),{Title:"Uruguay",'Data Path':"Americas/Latin America and the Caribbean/South America/Uruguay"});
Patch(Countries,Defaults(Countries),{Title:"Uzbekistan",'Data Path':"Asia/Central Asia/Uzbekistan"});
Patch(Countries,Defaults(Countries),{Title:"Vanuatu",'Data Path':"Oceania/Melanesia/Vanuatu"});
Patch(Countries,Defaults(Countries),{Title:"Venezuela (Bolivarian Republic of)",'Data Path':"Americas/Latin America and the Caribbean/South America/Venezuela (Bolivarian Republic of)"});
Patch(Countries,Defaults(Countries),{Title:"Viet Nam",'Data Path':"Asia/South-eastern Asia/Viet Nam"});
Patch(Countries,Defaults(Countries),{Title:"Virgin Islands (British)",'Data Path':"Americas/Latin America and the Caribbean/Caribbean/Virgin Islands (British)"});
Patch(Countries,Defaults(Countries),{Title:"Virgin Islands (U.S.)",'Data Path':"Americas/Latin America and the Caribbean/Caribbean/Virgin Islands (U.S.)"});
Patch(Countries,Defaults(Countries),{Title:"Wallis and Futuna",'Data Path':"Oceania/Polynesia/Wallis and Futuna"});
Patch(Countries,Defaults(Countries),{Title:"Western Sahara",'Data Path':"Africa/Northern Africa/Western Sahara"});
Patch(Countries,Defaults(Countries),{Title:"Yemen",'Data Path':"Asia/Western Asia/Yemen"});
Patch(Countries,Defaults(Countries),{Title:"Zambia",'Data Path':"Africa/Sub-Saharan Africa/Eastern Africa/Zambia"});
Patch(Countries,Defaults(Countries),{Title:"Zimbabwe",'Data Path':"Africa/Sub-Saharan Africa/Eastern Africa/Zimbabwe"});
```
