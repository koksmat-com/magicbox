
/* eslint-disable turbo/no-undeclared-env-vars */
import React from "react";
import createClient from "openapi-fetch";
// npx openapi-typescript http://localhost:4322/docs/admin/openapi.json --output admin.d.ts --useOptions --exportClient
import { paths, components } from "../admin.api"; // (generated from openapi-typescript)
import Link from "next/link";
export const NOAPPKEY =  "NOAPPKEY"
 async function authenticate(): Promise<{ token: string | undefined }> {
  const { post } = createClient<paths>({
    baseUrl: process.env.KOKSMAT_HOST

  });
  if (!process.env.KOKSMAT_APPKEY){
    return { token: NOAPPKEY};
  }
  const { data, error } = await post("/authorize", {
    cache:  "default", // "no-cache",
    next: { revalidate: 300 } ,
    body: {
      appkey: process.env.KOKSMAT_APPKEY,
    }
  });

  if (error) {
    return { token: undefined };
  } else return { token: data?.token };



}

const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);


  export async function  getClient () {
    const { token } = await authenticate();
    const client = createClient<paths>({
      baseUrl: process.env.KOKSMAT_HOST,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      client,token
    };
  }

export default async function AuditLogEntries() {
  
  const {client,token} = await getClient();
  // happends under build in Docker if the env variable is not set
  // impact is that the page is not pre-rendered
  if (token===NOAPPKEY){ 
    console.log("No app key defined")
    return null
  }
  const get = client.get 


  const { data, error } = await get("/v1/admin/auditlogsummary", {
    cache:  "default", // "no-cache",
    next: { revalidate: 60 } ,
    params: {

    },
  });

  if (error) {
    console.log("Error",error)
    return <div>{error as string}</div>;
  }
  console.log("Number of records",data?.length)
  const results = groupBy(data, i => i.subject as string);
  const powershellLogentries = groupBy(results["powershell"], i => i.date as string);


  const dates = Object.keys(powershellLogentries).sort().reverse();
  return (
    <div>
      <div className="text-2xl">PowerShell</div>
      {
      
      
      dates.map((date, id) => {
        const hours = powershellLogentries[date].sort((a, b) => {return parseInt(a.hour as string) > parseInt(b.hour as string) ? 1 : -1})

        return <div key={id}>
          <div className="text-xl">{date}</div>
          <div className="flex">
          {hours.map((item, id) => {
            return <PowerShellAuditLogHour key={id} item={item} />;
          })}</div>

        </div>;
      })}


    </div>
  );
}



function PowerShellAuditLogHour(props: { item: components["schemas"]["AuditAuditLogSum"] }) {
  return <div className="p-3">
    <Link href={`/koksmat/admin/auditlog/subject/powershell/${props.item.date}/${props.item.hour}`}>
    <div>{props.item.hour}:00</div><div className="text-sm"> {props.item.count} records</div></Link></div>;
}

