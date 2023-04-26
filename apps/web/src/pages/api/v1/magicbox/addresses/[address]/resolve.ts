import { NextApiRequest, NextApiResponse } from "next";
import { Search } from "@koksmat/search";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method?.toUpperCase() !== "GET") {
    res.status(405).send("Not allowed - use GET method");
    return;
  }

  const address = req.query.address as string;
  const search = new Search();
  const result = await search.resolveEmailAddress(address);
  res.send(result);
}
