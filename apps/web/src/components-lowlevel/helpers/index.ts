


export type onOver = (node: NavigationNode) => void;
export type NexiNavParent = {
    title: string;
    url: string;
  }
  export type NexiNavConfig = {
    enabled: boolean;
    parents: NexiNavParent[];
    clarityId: string;
    matomoId: string;
    showSearch: boolean;
    hideHome: boolean;
    homeUrl: string;
    showSiteTitle: boolean;
    siteUrl : string;
    siteTitle : string;
  
  }
export interface NavigationNode {
    onOver?: onOver;
    onOut?: (node: NavigationNode) => void;
 
    Id?: number;
    Title: string;
    Url: string;
    IsDocLib?: boolean;
    IsExternal?: boolean;
    ParentId?: number;
    ListTemplateType?: number;
    AudienceIds?: any;
    CurrentLCID?: number;
    Children?: NavigationNode[];
    OpenInNewWindow?: any;
}



export interface NavigationInfo {
    isAudienceTargeted: boolean;
    quickLaunch: NavigationNode[];
    topNav: any[];
}
export interface IContext {
    navigationInfo: NavigationInfo;
}
export const  buildBreadcrumbHtml = (webTitle:string,webUrl:string,navigationNodes:NavigationNode[],url:string) : string => {

        return ""


  }


