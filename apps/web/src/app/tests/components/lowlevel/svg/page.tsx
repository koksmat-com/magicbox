"use client"
import SVGInteraction from "@/components-lowlevel/SVGinteraction" 
import { SVGMap } from "react-svg-map";



export default async function Page({ params }: { params: { slug: string[] } }) {
 
  return (
    <div>
  
   <SVGInteraction  svgFile="/africa.svg"/>


 </div>
  )
}
