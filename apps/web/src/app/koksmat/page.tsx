
import Link from 'next/link';
import React from 'react';
export default function Koksmat() {
 return <div className="w-full bg-yellow-100 h-screen">

<div className="grid h-screen place-items-center">
     
         
          <div className="place-items-center">
            <button className="rounded-full text-white bg-[#2D32A9] p-2 px-10 hover:from-pink-500 hover:to-yellow-500 from-green-400 to-blue-500">
              {" "}
              <Link href="/koksmat/admin">Click to get started</Link>
            </button>
          </div>
       
      </div>
 </div>
}
