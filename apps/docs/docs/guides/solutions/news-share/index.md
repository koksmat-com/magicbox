---
draft: true
tags: ["PowerLink"]
---

# News Share
Learn how to make ....

![](2022-11-09-10-24-38.png)

:::warning Require Tech assistance
You need to have the [PDNS](../../../pro-tips/services/pdns/index.md) deployed to your infrastructure to make this recipe make sense
:::



## Ingredients

| Icon | Ingredient | Description |
| --- | --- | ---|
|<img style={{width:"64px"}} src="https://jumpto365.com/resources/images/Icons/SharePoint%20New.png"/> | SharePoint List | List used for sharing Links |
|<img style={{width:"64px"}} src="https://blob.jumpto365.com/images/default/h/e/x/hexatown.com/m/matt@hexatown.com/2022/10/Power%20Apps.png-20221023-102329.png"/> | Power App | Power App to copy news metadata to PowerLink |
|<img style={{width:"64px"}} src="https://blob.jumpto365.com/images/default/h/e/x/hexatown.com/m/matt@hexatown.com/2022/10/Power%20Automate.png-20221023-102255.png"/> | Power Automate | Power Automate to publish the link |
|<img style={{width:"64px"}} src="http://code.benco.io/icon-collection/azure-icons/Blob-Page.svg"/> | Blob Storage | Blob Storage to store the image and the link|


## Recipe

### Create the SharePoint List

Create a SharePoint List called `PowerLink` with the following columns:

| Column | Type | Description |
| --- | --- | ---|
| Title | Single line of text | Title of the link |
| Link | Hyperlink or Picture | Link to the news |
| Image | Picture | Image of the news |
| Published | Yes/No | Is the link published? |

### Create the Power App

Create a Power App with the following screens:

#### Screen 1

```javascript
UpdateContext(
    {
        getImageStep1: Split(
            RichTextEditor1.HtmlText,
            "<img src=""data:image/png;base64"
        )
    }
);
If(
    CountRows(getImageStep1) = 2,
    UpdateContext(
        {
            image: First(
                Split(
                    Last(getImageStep1).Result,
                    "="" />"
                )
            )
        }
    );
    false
)
```


This screen will show the list of links. It will also have a button to add a new link.

### Create the Power Automate

Create a Power Automate to publish the link. It will do the following:

1. Get the link from the SharePoint List
2. Get the image from the SharePoint List
3. Upload the image to the Blob Storage
4. Create a new page in the PDNS

### Create the Blob Storage

Create a Blob Storage to store the image and the link.

## Result

![](2022-11-09-10-24-38.png)
