import { MongoClient, MongoClientOptions } from "mongodb"

export class MongoDB  {
private static _instance : MongoDB
private _client : MongoClient

constructor (url: string, options?: MongoClientOptions | undefined){
    this._client = new MongoClient(url,options)

}

static getInstance(url: string, options?: MongoClientOptions | undefined) : MongoDB {

    if (!MongoDB._instance){
        MongoDB._instance = new MongoDB(url,options)
    }
    return  MongoDB._instance
}

get client() : MongoClient{
    return this._client
}

}

