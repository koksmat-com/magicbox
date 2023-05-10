"use client"
import LeftNav from "./leftnav"
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <FluentProvider theme={webLightTheme}>
    <div className="flex">
      <div className="w-96">
      <LeftNav/>
      </div>
      <div>
      {children}
      </div>
    </div>
    </FluentProvider>



        
  )
}
