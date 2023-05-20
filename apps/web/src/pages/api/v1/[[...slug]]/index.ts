import { NextApiRequest, NextApiResponse } from "next";
import { Facade } from "@koksmat/facade";
import debug from "debug";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const slug = req.query.slug ? (req.query.slug as string[]).join("/") : "";
  const method = req.method as string;
  const facade = Facade.getInstance()


  const result = await facade.postMessage(method,slug,req.body)
  
  //router.process(req,method,slug)
 

  res.status(result.hasError ? 500: 200 ).json(result.hasError ? result.errorMessage : result.data);
}
