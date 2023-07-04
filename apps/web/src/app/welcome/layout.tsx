"use client"

import { FluentProvider, webLightTheme,webDarkTheme } from '@fluentui/react-components';

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <FluentProvider theme={webLightTheme}>
    <div className="flex">

      <div>
      {children}
      </div>
    </div>
    </FluentProvider>



        
  )
}
