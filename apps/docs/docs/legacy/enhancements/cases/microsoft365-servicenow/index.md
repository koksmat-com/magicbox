# Exchange Online -  ServiceNow Integration

:::note Idea
This page is under construction
:::

## Introduction
Here is an outline on how it is possible to inject keys from Exchange Online into ServiceNow. The integration is based on the following components:

## Components
### 365admin.Integration

A JavaScript library that is loaded into ServiceNow. It monitors the context and sends it to 365admin.Hooks. It also receives messages from 365admin.App and injects them into the ServiceNow UI.

### 365admin.API

A REST API that handles the requests from ServiceNow. It is hosted on Azure and is secured with Azure AD. 

## Flow

```mermaid
sequenceDiagram
    autonumber
    actor EndUser
    participant ServiceNow.UI
    participant ServiceNow.Flow
    participant ServiceNow.UIScripts
    participant 365admin.Integration
    participant 365admin.CDN
    participant 365admin.Hooks
    EndUser->>+ServiceNow.UI: Open request for change to Exchange Online
    activate ServiceNow.UI
    par Interact with form
    ServiceNow.UIScripts-->>ServiceNow.UI: Inject integration code
    365admin.CDN-->>ServiceNow.UI: 365admin.Integration loaded and monitoring context
    par Integration monitor context every 250ms
    365admin.Integration-->>365admin.Integration: Check context
    365admin.Integration-->>365admin.Hooks: Context send (which URL and which input field in focus)
    365admin.Hooks-->>365admin.Integration: User is on a known input field show drop down
    end
    EndUser->>365admin.Integration: User clicked dropdown item 
    Note over ServiceNow.UI, 365admin.App: Iframe loaded on top of everything, messaging connection established between Integration and App
    EndUser->>365admin.App: User browse and find the key they want to inject (Name XXX)
    365admin.App-->>365admin.Integration: Post insert XXX to input field request through message channel
    365admin.Integration-->>ServiceNow.UI: Field updated with info from 365admin.App
    ServiceNow.UI->>EndUser: Field updated with info from 365admin.App
    EndUser->>ServiceNow.UI: Submit item
    end
    deactivate ServiceNow.UI
    activate ServiceNow.Flow
    ServiceNow.Flow->>365admin.API: Handle request
    365admin.API->>ServiceNow.Flow: Return result
    ServiceNow.Flow->>EndUser: Send mail with result
    deactivate ServiceNow.Flow
    
```

```javascript
document.addEventListener('DOMContentLoaded', function () {
    // Load the integration script
    var script = document.createElement('script');
    script.src = 'https://365admin.azureedge.net/365admin.integration.js';
    document.head.appendChild(script);
});

// The integration script will call this function when it is loaded

```
