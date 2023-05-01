import { z } from "zod";
import fields from "./fields";

export default class records {
  static displayNameAlias = z.object({
  
    displayName: fields.displayName,
    alias: fields.alias,
  });

static createRequestResult = z.object({
  identity: fields.identity,
  name: fields.mailboxname,
  displayName: fields.displayName,
})

static createRequest = this.displayNameAlias.extend({
  name: fields.mailboxname,

});
}