
import { WebEx } from "@koksmat/webex"
import Link from "next/link"
export default async function Home() {
  const webEx = new WebEx()
  const response = await webEx.devices()

  const deviceas = response.data.items as any[]

  return (

    <div>
      {deviceas?.map((device, index) => {
        return <div key={index}><Link href={"/sandbox/webex/" + device.id} >{device.displayName}</Link> </div>
      })}

<pre>

  {JSON.stringify(deviceas,null,2)}
</pre>
    </div>
  )
}