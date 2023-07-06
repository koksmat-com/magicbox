import React from 'react'
import LeftNavAdmin from './leftnav'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
  
    <div className="flex">
        
          <LeftNavAdmin />


 
      <div className="overflow-auto h-max w-full">
      {children}
      </div>
    </div>




        
  )
}
