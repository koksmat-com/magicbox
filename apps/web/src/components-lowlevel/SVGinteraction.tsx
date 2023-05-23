"use client"
import * as d3 from "d3"
import { useEffect } from "react"
import unicolor from "uniqolor"
export default function SVGInteraction({
  svgFile,
  }: {
    svgFile: string
  }) {


useEffect(() => {
  d3.xml(svgFile)
  .then(data => {
    const selectSvg = d3.select("svg")  
    console.log("nodes",selectSvg.nodes)
    //if (selectSvg.nodes) 

    //debugger
    const svgContainer = d3.select("#svg-container")  as any 
  
    svgContainer.node().append(data.documentElement)
   
    const paths = d3.selectAll("path")
    paths.attr("fill",unicolor.random().color)
    paths.on("click",(e : any)=>{
      
      const path  = e.srcElement
      d3.select(path).attr("fill","green")
      
      
   
      //debugger
    })

  });
  //debugger
  return () => {
    
  }
}, [svgFile])




    return (
      <div id="svg-container" style={{height:"500px",width:"500px"}} >
        
      </div>
    )
  }
  

//   var dataSelection = this._dataGroup
//     .selectAll('.post')
//     .data(data);
 
// dataSelection.enter()
//     .append('circle')
//     .classed('post', true)
//     .on('mouseover', (d, i) => {
//         console.log(d);
//     });