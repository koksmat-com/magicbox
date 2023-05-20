
import { Facade } from "@koksmat/facade"





export default async function Page({ params }: { params: { slug: string[] } }) {
  const facade = Facade.getInstance()
  const messenger = await facade.messenger()
  const reply = ""
  // const reply = await messenger.send("test",{ method: "post",
  //   route: "string",
  //   payload: {x:1,y:2}})

  return (
    <div className="container mx-auto px-4">
        <div className="text-3xl">Messaging</div>
        <pre>
          {JSON.stringify(reply,null,2)}
        </pre>
    
    </div>
  )
}
