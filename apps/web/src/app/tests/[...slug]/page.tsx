
import { Facade } from "@koksmat/facade"
export default async function Page({ params }: { params: { slug: string[] } }) {

  const facade = Facade.getInstance()

  const slug = decodeURIComponent(params.slug.join("/"))
  const path = slug.split(":").shift() as string
  const method = slug.split(":").pop() as ("get"|"put"|"post"|"delete")

  const endPoint = facade.router.matchRoute(method, path)
  const openAPI = facade.router.matchRouteOpenAPI(method,path) 

  if (!openAPI) {
    return <div>Open API definition not found</div>
  }
  
  if (!endPoint) {
    return <div>Endpoint not found</div>
  }


  
  return (
    <div>
      <div className="text-3xl pb-8" >{endPoint?.summary}</div>
      <div className="text-2xl pb-2">Script</div>

  

    

      <div className="text-xl pb-2">Commands used</div>
      {endPoint?.script.commands.map((command, index) => { return <div className="text-blue-600" key={index}>{command}</div> })}


      <div className="text-xl pb-2">File output</div>
      {endPoint?.script.outputFiles?.map((fileName, index) => { return <div className="text-blue-600" key={index}>{fileName}</div> })}



      <div className="text-2xl pb-2">Source</div>

      <pre className="text-blue-600 text-sm">
        {endPoint?.script.code}

      </pre>


    </div>
  )
}
