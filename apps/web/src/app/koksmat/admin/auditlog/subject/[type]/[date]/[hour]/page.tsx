import Link from "next/link";
import { client } from "../../../../page";




export const metadata = {
    title: 'Auditlog ',
    
  }
  

export default async function KoksmatAdmin({ params }: { params: { type: string,date: string,hour: string } }) {
    const  {get} = await client();
    const {date,hour,type} = params;


    const { data, error } = await get("/v1/admin/auditlogs/date/{date}/{hour}", {
      cache: "no-cache",
      params: {
        path: {
            date,
            hour,
        }
      },
    });
  
    if (error) {
      return <div>{error as string}</div>;
    }
 return <div>

Audit Log Entries (PREVIEW) {params.type} {params.date} {params.hour}

{data?.auditlogs?.map((item, id) => {
    return <div key={id}>
        <div><Link href={"/koksmat/admin/auditlog/"+item.id}>{item.scriptname}</Link></div>
    </div>;} )}

 </div>
}
