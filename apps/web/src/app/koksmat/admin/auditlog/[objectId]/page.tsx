import { client } from "../page";
export const metadata = {
    title: 'Auditlog ',
    
  }
  
export default async function KoksmatAdmin({ params }: { params: { objectId: string } }) {
    const  {get} = await client();
    const {objectId} = params;
    const { data, error } = await get("/v1/admin/auditlogs/powershell/{objectId}", {
      cache: "no-cache",
      params: {
        path: {
          objectId
        }
      },
    });
  
    if (error) {
      return <div>{error as string}</div>;
    }
 return <div>

Audit Log Entries (PREVIEW) {objectId} 
<pre>
{data?.powershellauditlog?.result}
</pre>
 </div>
}
