
import { WebEx } from "@koksmat/webex"
export default async function Home({ params }: { params: { id: string } }) {
  const webEx = new WebEx()
  const response = await webEx.device(decodeURIComponent(params.id))

  const device = response.data

  

  return (

    <div>
     
     <pre >{JSON.stringify(device, null, 2)}</pre>
    

    </div>
  )
}