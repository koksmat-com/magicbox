import Link from "next/link";

export default function LeftNavAdmin(){
    return  <div className="w-40 bg-zinc-500 text-white h-screen">
   
    <div className='p-2 mt-11'>
        <Link href="/koksmat/admin/auditlog">Audit Logs</Link>
    </div>
    </div>


}