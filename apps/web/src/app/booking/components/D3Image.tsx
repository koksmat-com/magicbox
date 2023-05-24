"use client";
import React, { useEffect } from "react";
import * as d3 from "d3";

const D3Image = ({ SVGImage }: { SVGImage: string }) => {
  useEffect(() => {
    const svg = d3.select("#my-svg");
    svg
      .append("image")
      .attr("xlink:href", SVGImage)
      .attr("width", 100)
      .attr("height", 100);
  });

  return <svg id="my-svg"></svg>;
};

export default D3Image;
