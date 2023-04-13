import { EndPointHandler, IEndPointHandler } from "./EndPointHandler"

export class Route {
    private _path : string
    private _method : string
    private _endpointHandler :IEndPointHandler

    constructor (path: string, method: string, endpoint: IEndPointHandler) {
        this._path = path
        this._method = method
        this._endpointHandler = endpoint

    }

    
    public get key() : string {
        return this._path.toLowerCase() + ":" +this._method.toLowerCase()
    }

    
    public get endPoint() : IEndPointHandler
     {
        return this._endpointHandler;
    }
    
    
}


export type Request = {
    query: any;
    body: any;

}
export type Response = {
    status: number;
    body: any;
}