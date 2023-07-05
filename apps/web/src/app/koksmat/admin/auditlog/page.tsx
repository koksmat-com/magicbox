
/* eslint-disable turbo/no-undeclared-env-vars */
import React from "react";
import createClient from "openapi-fetch";
// npx openapi-typescript http://localhost:4322/docs/admin/openapi.json --output admin.d.ts --useOptions --exportClient
import { paths, components } from "../admin.api"; // (generated from openapi-typescript)
import Link from "next/link";

 async function authenticate(): Promise<{ token: string | undefined }> {
  const { post } = createClient<paths>({
    baseUrl: process.env.KOKSMAT_HOST

  });

  const { data, error } = await post("/authorize", {
    cache: "no-cache",
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


  export async function  client () {
    const { token } = await authenticate();
    const c = createClient<paths>({
      baseUrl: process.env.KOKSMAT_HOST,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return c;
  }

export default async function AuditLogEntries() {
  
  const  {get} = await client();


  const { data, error } = await get("/v1/admin/auditlogsummary", {
    cache: "no-cache",
    params: {

    },
  });

  if (error) {
    return <div>{error as string}</div>;
  }

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

