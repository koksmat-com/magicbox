
import { Facade, PowerPackMethods } from "@koksmat/facade"
import { Suspense } from "react"// Function that sleeps

import { revalidateTag } from 'next/cache';
import { ViewSourceCode } from "@koksmat/react-components";
import { ViewPowerShellCodeInstance } from "./ViewPowerShellCodeInstance";


/*

function runs on server due to the "use server" comment 

A "hack" into the action property of the form tag is used to tell the compiler to post formdata to the server and not the client, this 
allow us to get access to all server side methods.


The current only way to communicate back to the client is to invalidate the cache, this will trigger a revalidation of the parts of the page depended
on the cache tag 
*/
async function startProcess(formData: FormData) {
  'use server'
  const facade = Facade.getInstance()
  const method: PowerPackMethods = formData.get("method") as PowerPackMethods
  const path = formData.get("path") as string
  const payload = JSON.parse(formData.get("payload") as string)

  console.log("Processing on server")


  const result = await facade.processMessage(method, path, payload)
  console.log(result)
  revalidateTag("test")
  return "done"
}


export default async function Page({ params }: { params: { slug: string[] } }) {


  const facade = Facade.getInstance()

  const slug = decodeURIComponent(params.slug.join("/"))
  const path = slug.split(":").shift() as string
  const method = slug.split(":").pop() as PowerPackMethods

  const endPoint = facade.router.matchRoute(method, path)
  const openAPI = facade.router.matchRouteOpenAPI(method, path)
  const payload = endPoint?.testCases[0]?.data as object




  return (
    <div className="container mx-auto px-4">
      <div className="text-3xl " >{endPoint?.summary}</div>
      <div className="text--l pb-8" >{slug}</div>
      <div className="text-2xl pb-2">Test cases</div>
      {/* 
  // @ts-ignore */}
      <form action={startProcess} >
        <div className="flex flex-wrap ">
          <div className="grow ">
            <div >
              <input className="w-full" type="text" name="method" defaultValue={method} readOnly />
            </div>
            <div>
              <input className="w-full" type="text" name="path" defaultValue={path} readOnly />
            </div>
            <textarea className="w-full h-2/4" name="payload" defaultValue={JSON.stringify(payload)}  >


            </textarea>
          </div>


          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full h-8' type="submit">Submit</button>
        </div>

      </form>



      <Suspense fallback={<div className="bg-slate-200 p-10" >Processing ...</div>}>
        <ViewPowerShellCodeInstance method={method} path={path} />


      </Suspense>

      <div className="text-2xl pb-2">Script</div>





      <div className="text-xl pb-2">PowerShell Commands used</div>
      {endPoint?.script.commands.map((command, index) => { return <div className="text-green-600 bg-slate-800" key={index}>{command}</div> })}


      <div className="text-xl pb-2">File output if any</div>
      {endPoint?.script.outputFiles?.map((fileName, index) => { return <div className="text-green-600  bg-slate-800" key={index}>{fileName}</div> })}



      <div className="text-2xl pb-2">Source</div>


      <ViewSourceCode language="powershell" code={endPoint?.script.code as string} />




    </div>
  )
}
