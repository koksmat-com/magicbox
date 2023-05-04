
import { Facade } from "@koksmat/facade"
import Link from "next/link"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  const facade = Facade.getInstance()
  const keys = facade.routeKeys
  return (
   
<div className="flex">

    <div className="p-4">
      <div className="text-xl">Tests</div>
      <ul>
      {keys.map((key,index)=>{return <li key={index}><Link href={"/tests"+key}>{key}</Link>  </li>}) }
      </ul>
    </div>
  
      <div style={{minHeight:"100px",marginLeft:"auto",marginRight:"auto",maxWidth:"1024px"}}>{children}</div>
      </div>
  )
}
