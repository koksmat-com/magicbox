import React, { useEffect, useState } from "react";
import "./styles.module.css";

export  function KoksMateInteraction({
  onClick
}: {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  
}): JSX.Element {
  //let src = "https://onboard.koksmat.com/recipes?context="+encodeURI(window.location.href)
  let src = "https://onboard.koksmat.com/recipes"
  return (
    
      <div onClick={(e) => onClick(e)}
        className="koksmat-interaction"
             >
              
         <iframe src={src} style={{top:"100px",height:"90vh",width:"100vw"}}>
<div className="koksmat-comehome">
HOME

</div>

        </iframe> 
      </div>
    
  );
}


export default function KoksMate({
  children,
  caption,
}: {
  children: React.ReactChildren;
  caption: string;
}): JSX.Element {
  const [showInteraction, setShowInteraction] = useState(false)
  return (
    <>
      <div
      onClick={() => setShowInteraction(!showInteraction)}
        className="koksmat-callforaction"
             >
        DIY or Get Help
      </div>
      {showInteraction && <KoksMateInteraction onClick={(e)=>{setShowInteraction(false)}} />}
      </>
  );
}
