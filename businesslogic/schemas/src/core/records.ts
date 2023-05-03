import { z } from "zod";
import fields from "./fields";

export default class records {


static processRequest = z.object({
  correalationId: fields.identity
})


}