---
sidebar_position: 2
---
# Editing page content
In Docusaurus Markdown is used as the primary language for content authering. Markdown is a widely used standard which have been adopted by Microsoft amongst others. Check out https://docs.microsoft.com which is maintained based on a large number of supporting GitHub repositoris.

## A few Kitchen rules

### Example of link to a tag.
:::warning Keep direct linking to a minimum

Keep direct linking to other pages to a minimum. This is because the Docusaurus build process will create a new URL for each page. If you link to a page that is moved, the link will break. Instead, use links to tags or categories. This will ensure that the link will always work.
:::

```markdown
[#sharepoint-url](/docs/tags/sharepoint-url)
```

## Markdown Features
https://docusaurus.io/docs/markdown-features


## Images and Icons
One of the harder things are to find the right set of icons, and especially where to store and share them from. In jumpto365 we use Azure Storage for that purpose and have a public container where store and share from. The URL for the container is https://portal.azure.com/#view/Microsoft_Azure_Storage/ContainerMenuBlade/~/overview/storageAccountId/%2Fsubscriptions%2F8018d1a9-2d4c-4af6-9dcf-1e27709314ca%2FresourceGroups%2Fstorage-europe%2Fproviders%2FMicrosoft.Storage%2FstorageAccounts%2Fjumpto36500001/path/icons/etag/%220x8DACD2CB31B7130%22/defaultEncryptionScope/%24account-encryption-key/denyEncryptionScopeOverride~/false/defaultId//publicAccessVal/None

We have use icons from the [Material Design Icons](https://fonts.google.com/icons)


