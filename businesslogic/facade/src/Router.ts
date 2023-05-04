import { OpenAPI } from "@asteasolutions/zod-to-openapi";
import {
  PowerPacks,
  EndPointHandler,
  IEndPointHandler,
  Request,
  Response,
  processPowerPack
} from "@koksmat/powerpacks";
import debug from "debug";
import {OpenAPI3,OperationObject,PathItemObject, ReferenceObject} from "openapi-typescript";

export interface IRouter {
  process: (req: Request, method: string, slug: string) => Promise<Response>;
}

export class Router implements IRouter {
  private _powerPacks: PowerPacks;
  constructor(powerPacks: PowerPacks) {
    this._powerPacks = powerPacks;
  }

  public get openAPIdocument(): string {
    const res = this._powerPacks.getOpenApiDocumentation();
    return res
  }

  public matchRouteOpenAPI(method: ("get"|"put"|"post"|"delete"),route:string) : OperationObject | ReferenceObject | undefined | null{

    // Wrong defintion out type in openapi-typescript, hence casting needed
    const api : OpenAPI3 = (this.openAPIdocument as any) as OpenAPI3;
    const item : PathItemObject = api.paths?.["/"+route] as PathItemObject
    if (!item) {
      return null
    }
    return item[method]
  }

  matchRoute(method: string, slug: string): IEndPointHandler | null {
    const log = debug("magicbox-nextjs-api:Router.matchRoute");
    log("method", method);
    log("slug", slug);
    const key = "/" + slug.toLowerCase() + ":" + method.toLowerCase();
    log("key", key);
    const endPointHandler = this._powerPacks.endPointHandler(key);

    if (endPointHandler) {
      log("found match");
      return endPointHandler;
    }
    log("no match");
    return null;
  }

  public process(
    req: Request,
    method: string,
    slug: string
  ): Promise<Response> {
    const log = debug("magicbox-nextjs-api:Router.process");

    return new Promise(async (resolve, reject) => {
      try {
        const endPointHandler: IEndPointHandler = this.matchRoute(
          method,
          slug
        ) as IEndPointHandler;
        if (!endPointHandler) {
          return resolve({ status: 404, body: { message: "Not found" } });
        }

        log("query", req.query);
        log("body", req.body);
        const result = await processPowerPack(endPointHandler,req);
      
        if (result.hasError){
          log("error", result.errorMessage);
          return resolve({ status: 500, body: result.errorMessage });
        }
        
        //endPointHandler
        //endPointHandler.  .process(req.query,req.body)

    
        log("result", result.data);
        resolve({ status: 200, body: result.data });
      } catch (error) {
        log("error", error);
        resolve({ status: 500, body: error });
      }
    });
  }
}
