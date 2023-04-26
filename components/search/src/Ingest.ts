import { IResult } from "@koksmat/core";
import { Client } from "@elastic/elasticsearch";
import { v4 as uuidv4 } from "uuid";

export const v = 1;

export default class Ingest {
  private _client: Client;
  // constructor( client: Client) {
  //   this._client = client
  // }
  constructor() {
    this._client = new Client({
      node: "https://localhost:9200",

      auth: {
        apiKey: "ZzFpanQ0Y0I3Z0p0ZzlycERVZHc6N0dHVms4NzZTamkxZTVJZ3FCTXlaUQ==",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async info() {
    return await this._client.info();
  }

  async indexGameOfThrones() {
    await this._client.bulk({
      body: [
        { index:  { _index: 'game-of-thrones3', _id: "1" } },
        {
          character: "Ned Stark",
          quote: "Winter is coming.",
        },
        { index:  { _index: 'game-of-thrones3', _id: "2" } },
        {
          character: "Daenerys Targaryen",
          quote: "I am the blood of the dragon.",
        },       
        { index:  { _index: 'game-of-thrones3', _id: "3" } },
        {
          character: "Tyrion Lannister",
          quote: "A mind needs books like a sword needs whetstone.",
        }
      ]})
/*

    await this._client.index({
      index: "game-of-thrones3",
      id:"1",
      body: {
        character: "Ned Stark",
        quote: "Winter is coming.",
      },
    });

    await this._client.index({
      index: "game-of-thrones3",
      id:"2",
      body: {
        character: "Daenerys Targaryen",
        quote: "I am the blood of the dragon.",
      },
    });

    await this._client.index({
      index: "game-of-thrones3",
      id:"3",
      body: {
        character: "Tyrion Lannister",
        quote: "A mind needs books like a sword needs whetstone.",
      },
    });
    */
  }
}
