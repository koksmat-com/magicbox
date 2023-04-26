import { NextApiRequest, NextApiResponse } from "next";
import { Search } from "@koksmat/search";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //const doc = Factory.getInstance().router.openAPIdocument;
  //res.status(200).json(doc);
  const search = new Search();
  const result = await search.resolveEmailAddress(req.body);
  res.send(result);
}
