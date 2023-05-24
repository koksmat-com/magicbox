"use client";
import React from "react";
import { UncontrolledReactSVGPanZoom } from "react-svg-pan-zoom";
import D3Image from "./D3Image";

const Viewer = ({ svg }: { svg: any }) => (
  <UncontrolledReactSVGPanZoom
    width={1000}
    height={800}
    background="#fff"
    tool="auto"
  >
    <D3Image SVGImage={svg} />
    {/* <image href={svg} /> */}
  </UncontrolledReactSVGPanZoom>
);

export default Viewer;
