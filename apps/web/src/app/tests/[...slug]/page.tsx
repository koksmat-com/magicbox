/// <reference types="react/experimental" />
import { Facade } from "@koksmat/facade"
import { Suspense } from "react"

// Function that sleeps

function sleep(ms: number): Promise<string> {
  return new Promise(resolve => setTimeout(()=>{resolve("done")}, ms));
}




// @ts-expect-error
export  async function Process({method, path}:{method:("get" | "put" | "post" | "delete"), path:string}) : any {
  const facade = Facade.getInstance()
  const endPoint = facade.router.matchRoute(method, path)
  const payload = endPoint?.testCases[0]?.data as object

  if (!payload){
    return "No test cases found for this endpoint"
  }
  const result = await facade.processMessage(method, path,{method,route:path,payload})
// const result = {
//   "hasError": true,
//   "errorMessage":"Error message",
//   "data": {
//     "Name": "test729d6f29-d1e4-42a8-9d62-c39a7d223e78",
//     "DisplayName": "test729d6f29-d1e4-42a8-9d62-c39a7d223e78",
//     "Identity": "test729d6f29-d1e4-42a8-9d62-c39a7d223e78",
//     "PrimarySmtpAddress": "test729d6f29-d1e4-42a8-9d62-c39a7d223e78@M365x65867376.onmicrosoft.com"
//   }
//}
  return (
    <div>
      <div className="text-2xl pb-2">Result</div>
      {result.hasError && <div className="bg-red-600 text-white p-10">{result.errorMessage}</div>}
      {!result.hasError && <div className="bg-green-600 text-white p-10">Success</div>}
    <pre >
      {JSON.stringify(result,null,2)}
    </pre>
    </div>
  );
}

export default async function Page({ params }: { params: { slug: string[], action: string } }) {

  const facade = Facade.getInstance()

  const slug = decodeURIComponent(params.slug.join("/"))
  const path = slug.split(":").shift() as string
  const method = slug.split(":").pop() as ("get" | "put" | "post" | "delete")

  const endPoint = facade.router.matchRoute(method, path)
  const openAPI = facade.router.matchRouteOpenAPI(method, path)

  if (!openAPI) {
    return <div>Open API definition not found</div>
  }

  if (!endPoint) {
    return <div>Endpoint not found</div>
  }



  return (
    <div>
      <div className="text-3xl " >{endPoint?.summary}</div>
      <div className="text--l pb-8" >{slug}</div>
      <div className="text-2xl pb-2">Test cases</div>
      {endPoint?.testCases.map((testCase, index) => {
        return <div key={index}>
          <div>{testCase.name}</div>
          <div className="text-blue-600" >{JSON.stringify(testCase.data,null,2)}</div></div>
      })}
      <Suspense fallback={<div className="bg-slate-200 p-10" >Processing ...</div>}>
      <Process method={method} path={path}/>

        
      </Suspense>

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
