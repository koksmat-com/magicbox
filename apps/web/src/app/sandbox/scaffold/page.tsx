
import { Project } from "@koksmat/templates"
import Link from "next/link"

import PageTitle from "@/components-lowlevel/PageTitle"
import { redirect } from 'next/navigation';
import { NextRequest } from "next/server";

export default async function Home({ params,searchParams}: { params: { id: string },searchParams: any }) {
  const projectName = decodeURIComponent(searchParams.project)
  console.log(searchParams)

  const proj = new Project("/Users/nielsgregersjohansen/code/koksmat/magicbox/"+projectName)
  
  async function addClass(formData: FormData) {
    'use server'
    const _proj = new Project("/Users/nielsgregersjohansen/code/koksmat/magicbox/"+projectName)
    const name = formData.get("name") as string
    _proj.addClass(name)
    redirect(".");
  }
  return (

    <div className="p-10">
      <PageTitle>{"Scaffolding  " +proj.info.name}</PageTitle>

      <h1>Classes</h1>
      {proj.classes.map((c:string, index) => {
        return <div key={index}><Link href={"/sandbox/scaffold/class/" + c}>{c}</Link> </div>
      })}
      {/* 
  // @ts-ignore */}
      <form action={addClass} className="flex" >
        <div >
          <div>
            <div >
              <input type="text" name="name"  />
            </div>
        
          </div>
        </div>

        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full h-8' type="submit">Add</button>


      </form>

    </div>
  )
}