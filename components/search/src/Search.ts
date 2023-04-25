import { IResult } from "@koksmat/core";
import { Client } from "@elastic/elasticsearch"
import { v4 as uuidv4 } from "uuid";


export const v= 1

export default class Search {

  constructor( connectionObject: object) { 

  }

  async resolveEmailAddress(address:string){
    return address;
  }

}