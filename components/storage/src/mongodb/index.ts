import { MongoClient, MongoClientOptions } from "mongodb"

export class MongoDB  {
private static _instance : MongoDB
private _client : MongoClient | undefined

constructor (url: string, options?: MongoClientOptions | undefined){
    // If URL not set, don't try to setup
    this._client = url ? new MongoClient(url,options) : undefined
    
}

static getInstance(url: string, options?: MongoClientOptions | undefined) : MongoDB {

    if (!MongoDB._instance){
        MongoDB._instance = new MongoDB(url,options)
    }
    return  MongoDB._instance
}

get client() : MongoClient{
    return this._client as MongoClient
}

}

