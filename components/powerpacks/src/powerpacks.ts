import { extendZodWithOpenApi, OpenAPIRegistry,
    OpenAPIGenerator} from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { EndPointHandler, IEndPointHandler, ITestCase } from './EndPointHandler';
import { Route } from './Route';
import debug from 'debug';
import {OpenAPI3,OperationObject,PathItemObject, ReferenceObject} from "openapi-typescript";
extendZodWithOpenApi(z);

// singleton class
export class PowerPacks {
private static _instance: PowerPacks;
private _registry : OpenAPIRegistry;
private _isLoaded : boolean = false;
private _routes : Map<string, Route> 

constructor() {
this._registry = new OpenAPIRegistry();

const bearerAuth = this._registry.registerComponent(
  'securitySchemes',
  'bearerAuth',
  {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  }
);
this._routes = new Map<string,Route>();
}
static getInstance()  {
    if (this._instance) {
        
      return this._instance;
    } 
    this._instance = new PowerPacks();
    
    return this._instance;
}



public get routeKeys() : string[] {
  return Array.from(this._routes.keys())
}

addEndpoint(path:string,method:string,endpoint:IEndPointHandler) {
  const log = debug("magicbox:PowerPacks:addEndpoint")
  const route = new Route(path,method,endpoint);  
  if (this._routes.has(route.key)) {
    throw new Error(`Route ${route.key} already exists`)
  }
  this._routes.set(route.key,route);
  log(`Added route ${route.key}`)
}

public endPointHandler(key:string) : IEndPointHandler {
  return this._routes.get(key)?.endPoint as IEndPointHandler
}


public get registry() : OpenAPIRegistry {
  return this._registry
}

public get isLoaded() : boolean {
  return this._isLoaded
}

public getOpenApiDocumentation()  {
  const generator = new OpenAPIGenerator(this._registry.definitions, '3.0.0');
  return generator.generateDocument({
    info: {
      version: '1.0.0',
      title: 'MagicBox',
      description: 'MagicBox API'
    },
    servers: [{ url: 'api/v1'}]
  })
}


}


export function getExampleFromOpenAPIDefinition(schema : z.ZodSchema) : ITestCase {
  const __registry = new OpenAPIRegistry();


  __registry.registerPath({  
    method: "post",
    path : "/route",
    summary: "no summary",
    request: {
      body: {
        description: "no description",
        content: {
          "application/json": {
            schema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "no description",
        content: {
          "application/json": {
            schema,
          },
        },
      },
    },
  });
  const generator = new OpenAPIGenerator(__registry.definitions, '3.0.0');

  const doc = generator.generateDocument({
    info: {
      version: '1.0.0',
      title: 'MagicBox',
      description: 'MagicBox API'
    },
    servers: [{ url: 'api/v1'}]
  })
  const api : any = (doc as any)as any //as OpenAPI3;
  const props = doc.paths["/route"].post.requestBody.content["application/json"].schema.properties
  const example : any = {}
  Object.keys(props).map(key => {
    example[key] = props[key].example

  })
  return {
    name: "example from schema",
    data: example
  }

}
 


