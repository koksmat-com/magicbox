import { IResult } from "@koksmat/core";
import { Client } from "@elastic/elasticsearch"
import { v4 as uuidv4 } from "uuid";


export const v= 1

export default class Ingest {
  private _client: Client
  // constructor( client: Client) { 
  //   this._client = client
  // }
  constructor( ) {
    this._client = new Client({ node: 'https://localhost:9200',
    
   
    auth: {
    apiKey:"ZzFpanQ0Y0I3Z0p0ZzlycERVZHc6N0dHVms4NzZTamkxZTVJZ3FCTXlaUQ==",
   
    
    },
    tls: {
      rejectUnauthorized: false
    }
  
  
  })

  }

  async info() {
    return await this._client.info()
  }
  private async index( data : any) {
    await this._client.index(data)
  }
  async indexGameOfThrones() {
    await this.index({
      index: 'game-of-thrones',
      body: {
        character: 'Ned Stark',
      quote: 'Winter is coming.'
      }
    })
  
    await this.index({
      index: 'game-of-thrones',
      body: {
        character: 'Daenerys Targaryen',
      quote: 'I am the blood of the dragon.'
      }
    })
  
    await this.index({
      index: 'game-of-thrones',
      body: {
        character: 'Tyrion Lannister',
      quote: 'A mind needs books like a sword needs whetstone.'
      }
    })
  }
}