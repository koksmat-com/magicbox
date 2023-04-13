import { NextApiRequest, NextApiResponse } from "next";


import { Factory } from "@nexi-magicbox/factory"
export default function handler(req:NextApiRequest, res:NextApiResponse) {

  const doc = Factory.getInstance().router.openAPIdocument
  
  

    res.status(200).json(doc)
  }