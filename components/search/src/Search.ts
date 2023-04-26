import { IResult } from "@koksmat/core";
import { Client } from "@elastic/elasticsearch";
import { v4 as uuidv4 } from "uuid";

export const v = 1;

export interface SearchResult<T> {
  took: number;
  timed_out: boolean;
  _shards: Shards;
  hits: Hits<T>;
}

export interface Shards {
  total: number;
  successful: number;
  skipped: number;
  failed: number;
}

export interface Hits<T> {
  total: Total;
  max_score: number;
  hits: Hit<T>[];
}

export interface Total {
  value: number;
  relation: string;
}

export interface Hit<T> {
  _index: string;
  _id: string;
  _score: number;
  _source: T;
}

export interface IAddress {
  guid: string;
  address: string;
  "@timestamp": string;
  timestamp: string;
}

export class Search {
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

  async resolveEmailAddress(address: string) {
    const result: SearchResult<IAddress> = (await this._client.search({
      index: "addresses",
      query: {
        match: { address },
      },
    })) as any;
    return result.hits.hits[0]?._source.guid;
  }
}
