import { useRef, useEffect } from "react";
import * as d3 from "d3";

const dataset = [
  {
    views: 237,
  },
  {
    views: 613,
  },
  {
    views: 255,
  },
  {
    views: 996,
  },
  {
    views: 19,
  },
  {
    views: 934,
  },
  {
    views: 836,
  },
  {
    views: 192,
  },
  {
    views: 937,
  },
  {
    views: 249,
  },
  {
    views: 990,
  },
  {
    views: 138,
  },
  {
    views: 897,
  },
  {
    views: 72,
  },
  {
    views: 748,
  },
  {
    views: 252,
  },
  {
    views: 767,
  },
  {
    views: 292,
  },
  {
    views: 12,
  },
  {
    views: 363,
  },
  {
    views: 736,
  },
  {
    views: 224,
  },
  {
    views: 766,
  },
  {
    views: 64,
  },
];

export function BarChart() {
  const ref = useRef();

  useEffect(() => {
    const h = 400;
    const w = ref.current.offsetWidth;

    //create ordinal scale
    var xScale = d3
      .scaleBand()
      .domain(d3.range(dataset.length))
      .rangeRound([0, w])
      .paddingInner(0.05);

    var yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset.map((d) => d.views))]) // Inserito
      .range([0, h]);

    //Create SVG element
    var svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    //build bars
    svg
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", function (d, i) {
        return xScale(i);
      })
      .attr("y", function (d) {
        return h - yScale(d.views); // Inserito
      })
      .attr("width", xScale.bandwidth())
      .attr("height", function (d) {
        return yScale(d.views); // Inserito
      })
      .attr("fill", "teal");

    //text labels on bars
    svg
      .selectAll("text")
      .data(dataset)
      .enter()
      .append("text")
      .text(function (d) {
        return d.views; // Inserito
      })
      .attr("x", function (d, i) {
        return xScale(i) + xScale.bandwidth() / 2;
      })
      .attr("y", function (d) {
        return h - yScale(d.views) + 14; // Inserito
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "11px")
      .attr("fill", "white")
      .attr("text-anchor", "middle");
  }, []);

  return <div className="w-full" ref={ref}></div>;
}
