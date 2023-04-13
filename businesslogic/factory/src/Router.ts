import {
  PowerPacks,
  EndPointHandler,
  IEndPointHandler,
  Request,
  Response,
} from "@nexi-magicbox/powerpacks";
import debug from "debug";

export interface IRouter {
  process: (req: Request, method: string, slug: string) => Promise<Response>;
}

export class Router implements IRouter {
  private _powerPacks: PowerPacks;
  constructor(powerPacks: PowerPacks) {
    this._powerPacks = powerPacks;
  }

  public get openAPIdocument(): string {
    return this._powerPacks.getOpenApiDocumentation();
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
        const result = await endPointHandler.process(req);
      
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
