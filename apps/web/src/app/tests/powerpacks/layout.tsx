
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
<div>

       
       


    <div className="flex">

      <div className="p-4">
     
        <ul>
          {keys.map((key, index) => { return <li key={index}><Link href={"/tests/powerpacks" + key}>{key}</Link>  </li> })}
        </ul>
      </div>

      <div className="mx-auto w-max" >{children}</div>
    </div>
    </div>
  )
}
