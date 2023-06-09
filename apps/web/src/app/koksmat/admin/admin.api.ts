/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/authorize": {
    /**
     * Authenticating app 
     * @description 
     * 
     * You need an ´appkey´  to access the API. The ´appkey´  is issue by [niels.johansen@nexigroup.com](mailto:niels.johansen@nexigroup.com).
     * 
     * Use the ´appkey´  to get an access token through the /v1/authorize end point. The access token is valid for 10 minutes.
     * 
     * Pass the access token in the Authorization header as a Bearer token to access the API.
     */
    post: operations["koksmat/restapi.signin"];
  };
  "/v1/admin/auditlogs/date/{date}/{hour}": {
    /**
     * Get audit logs  
     * @description Get audit logs by date and hour - timezone is  GMT
     */
    get: operations["koksmat/restapi.getAuditLogs"];
  };
  "/v1/admin/auditlogs/powershell/{objectId}": {
    /** Get audit logs */
    get: operations["koksmat/restapi.getAuditLogPowershell"];
  };
  "/v1/admin/auditlogsummary": {
    /**
     * Get Audit Log summary 
     * @description Get Audit Log summary
     */
    get: operations["koksmat/restapi.GetAuditLogSummarys"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    AuditAuditLogSum: {
      count?: number;
      /** Format: date-time */
      created_at?: string;
      date?: string;
      hour?: string;
      id?: components["schemas"]["PrimitiveObjectID"];
      subject?: string;
      /** Format: date-time */
      updated_at?: string;
    };
    AuditPowerShellLog: {
      appid?: string;
      console?: string;
      /** Format: date-time */
      created_at?: string;
      database?: string;
      haserror?: boolean;
      id?: components["schemas"]["PrimitiveObjectID"];
      input?: string;
      result?: string;
      scriptname?: string;
      scriptsrc?: string;
      subject?: string;
      /** Format: date-time */
      updated_at?: string;
    };
    PrimitiveObjectID: (number)[] | null;
    RestErrResponse: {
      /** @description Application-specific error code. */
      code?: number;
      /** @description Application context. */
      context?: {
        [key: string]: unknown;
      };
      /** @description Error message. */
      error?: string;
      /** @description Status text. */
      status?: string;
    };
    RestapiGetResponse: {
      auditlogs?: (components["schemas"]["AuditPowerShellLog"])[] | null;
      currentpage?: number;
      numberofrecords?: number;
      pages?: number;
      pagesize?: number;
    };
    RestapiGetResponseType2: {
      powershellauditlog?: components["schemas"]["AuditPowerShellLog"];
    };
    RestapiSigninRequest: {
      appkey?: string;
    };
    RestapiSigninResponse: {
      token?: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type external = Record<string, never>;

export interface operations {

  /**
   * Authenticating app 
   * @description 
   * 
   * You need an ´appkey´  to access the API. The ´appkey´  is issue by [niels.johansen@nexigroup.com](mailto:niels.johansen@nexigroup.com).
   * 
   * Use the ´appkey´  to get an access token through the /v1/authorize end point. The access token is valid for 10 minutes.
   * 
   * Pass the access token in the Authorization header as a Bearer token to access the API.
   */
  "koksmat/restapi.signin": {
    requestBody?: {
      content: {
        "application/json": components["schemas"]["RestapiSigninRequest"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["RestapiSigninResponse"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": components["schemas"]["RestErrResponse"];
        };
      };
    };
  };
  /**
   * Get audit logs  
   * @description Get audit logs by date and hour - timezone is  GMT
   */
  "koksmat/restapi.getAuditLogs": {
    parameters: {
      query?: {
        /** @description page number */
        page?: number;
        /** @description page size */
        pagesize?: number;
      };
      path: {
        /** @description date of the audit log */
        date: string;
        /** @description hour of the audit log */
        hour: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["RestapiGetResponse"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": components["schemas"]["RestErrResponse"];
        };
      };
      /** @description Unauthorized */
      401: {
        content: {
          "application/json": components["schemas"]["RestErrResponse"];
        };
      };
    };
  };
  /** Get audit logs */
  "koksmat/restapi.getAuditLogPowershell": {
    parameters: {
      path: {
        /** @description id of the audit log */
        objectId: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["RestapiGetResponseType2"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": components["schemas"]["RestErrResponse"];
        };
      };
      /** @description Unauthorized */
      401: {
        content: {
          "application/json": components["schemas"]["RestErrResponse"];
        };
      };
    };
  };
  /**
   * Get Audit Log summary 
   * @description Get Audit Log summary
   */
  "koksmat/restapi.GetAuditLogSummarys": {
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": (components["schemas"]["AuditAuditLogSum"])[];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": components["schemas"]["RestErrResponse"];
        };
      };
      /** @description Unauthorized */
      401: {
        content: {
          "application/json": components["schemas"]["RestErrResponse"];
        };
      };
    };
  };
}
