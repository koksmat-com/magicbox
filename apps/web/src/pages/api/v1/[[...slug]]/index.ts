import { NextApiRequest, NextApiResponse } from "next";
import { Factory } from "@nexi-magicbox/factory";
import debug from "debug";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const slug = req.query.slug ? (req.query.slug as string[]).join("/") : "";
  const method = req.method as string;
  const factory = Factory.getInstance()


  const result = await factory.router.process(req,method,slug)
 

  res.status(result.status).json(result.body);
}
