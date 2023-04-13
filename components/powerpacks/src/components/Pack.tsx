import * as React from "react";

export interface PackProps {
  children: React.ReactNode;
  name:string
}

export function Pack(props: PackProps) {
  return (
  
  <div>
    <h1>Packer</h1>
  <button>{props.children}</button>;
  </div>)
}

Pack.displayName = "Pack";
