"use client";
import LeftNav from "./leftnav";
import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
} from "@fluentui/react-components";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    //TODO: Bright/Dark theme changer
    <FluentProvider theme={webDarkTheme}>
      <div className="flex">
        <div className="w-96">
          <LeftNav />
        </div>
        <div>{children}</div>
      </div>
    </FluentProvider>
  );
}
