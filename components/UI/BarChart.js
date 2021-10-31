// import React, { PureComponent } from "react";
// import {
//   BarChart as ReBarChart,
//   Bar,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   { name: "12AM", visits: 300, unique: 40 },
//   { name: "1AM", visits: 400, unique: 80 },
//   { name: "2AM", visits: 310, unique: 40 },
//   { name: "3AM", visits: 600, unique: 230 },
//   { name: "4AM", visits: 300, unique: 40 },
//   { name: "5AM", visits: 300, unique: 40 },
//   { name: "6AM", visits: 300, unique: 40 },
//   { name: "7AM", visits: 300, unique: 40 },
//   { name: "8AM", visits: 300, unique: 40 },
//   { name: "9AM", visits: 300, unique: 40 },
//   { name: "10AM", visits: 300, unique: 40 },
//   { name: "11AM", visits: 300, unique: 40 },
//   { name: "12PM", visits: 300, unique: 40 },
//   { name: "1PM", visits: 300, unique: 40 },
//   { name: "2PM", visits: 300, unique: 40 },
//   { name: "3PM", visits: 300, unique: 40 },
//   { name: "4PM", visits: 300, unique: 40 },
//   { name: "5PM", visits: 300, unique: 40 },
//   { name: "6PM", visits: 300, unique: 40 },
//   { name: "7PM", visits: 300, unique: 40 },
//   { name: "8PM", visits: 300, unique: 40 },
//   { name: "9PM", visits: 300, unique: 40 },
//   { name: "10PM", visits: 300, unique: 40 },
//   { name: "11PM", visits: 300, unique: 40 },
// ];

// export class BarChart extends PureComponent {
//   static demoUrl = "https://codesandbox.io/s/stacked-bar-chart-s47i2";

//   render() {
//     return (
//       <ResponsiveContainer width="100%" height="100%">
//         <ReBarChart
//           height={300}
//           data={data}
//           margin={{
//             top: 20,
//             right: 30,
//             left: 20,
//             bottom: 5,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="visits" stackId="a" fill="#111827" />
//           <Bar dataKey="unique" stackId="a" fill="#6B7280" />
//         </ReBarChart>
//       </ResponsiveContainer>
//     );
//   }
// }

import { useRef, useEffect } from "react";
import * as d3 from "d3";

const data = [
  { name: "12AM", visits: 300, unique: 40 },
  { name: "1AM", visits: 400, unique: 80 },
  { name: "2AM", visits: 310, unique: 40 },
  { name: "3AM", visits: 600, unique: 230 },
  { name: "4AM", visits: 300, unique: 40 },
  { name: "5AM", visits: 300, unique: 40 },
  { name: "6AM", visits: 300, unique: 40 },
  { name: "7AM", visits: 300, unique: 40 },
  { name: "8AM", visits: 300, unique: 40 },
  { name: "9AM", visits: 300, unique: 40 },
  { name: "10AM", visits: 300, unique: 40 },
  { name: "11AM", visits: 300, unique: 40 },
  { name: "12PM", visits: 300, unique: 40 },
  { name: "1PM", visits: 300, unique: 40 },
  { name: "2PM", visits: 300, unique: 40 },
  { name: "3PM", visits: 300, unique: 40 },
  { name: "4PM", visits: 300, unique: 40 },
  { name: "5PM", visits: 300, unique: 40 },
  { name: "6PM", visits: 300, unique: 40 },
  { name: "7PM", visits: 300, unique: 40 },
  { name: "8PM", visits: 300, unique: 40 },
  { name: "9PM", visits: 300, unique: 40 },
  { name: "10PM", visits: 300, unique: 40 },
  { name: "11PM", visits: 300, unique: 40 },
];

export const useD3 = (renderChartFn, dependencies) => {
  const ref = useRef();

  useEffect(() => {
    renderChartFn(d3.select(ref.current));
    return () => {};
  }, dependencies);
  return ref;
};

export function BarChart() {
  const ref = useD3(
    (svg) => {
      const height = 500;
      const width = 500;
      // const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };

      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.name))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);

      const y1 = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.visits)])
        .rangeRound([height - margin.bottom, margin.top]);

      const xAxis = (g) =>
        g.attr("transform", `translate(0,${height - margin.bottom})`).call(
          d3
            .axisBottom(x)
            .tickValues(
              d3
                .ticks(...d3.extent(x.domain()), width / 40)
                .filter((v) => x(v) !== undefined)
            )
            .tickSizeOuter(0)
        );

      const y1Axis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .style("color", "steelblue")
          .call(d3.axisLeft(y1).ticks(null, "s"))
          .call((g) => g.select(".domain").remove())
          .call((g) =>
            g
              .append("text")
              .attr("x", -margin.left)
              .attr("y", 10)
              .attr("fill", "currentColor")
              .attr("text-anchor", "start")
              .text(data.y1)
          );

      svg.select(".x-axis").call(xAxis);
      svg.select(".y-axis").call(y1Axis);

      svg
        .select(".plot-area")
        .attr("fill", "steelblue")
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", (d) => {
          console.log("d", d, x(d.name));

          return x(d.name);
        })
        .attr("width", x.bandwidth())
        .attr("y", (d) => y1(d.visits))
        .attr("height", (d) => y1(0) - y1(d.visits));
    },
    [data.length]
  );

  return (
    <svg
      ref={ref}
      style={{
        height: 500,
        width: "100%",
        marginRight: "0px",
        marginLeft: "0px",
      }}
    >
      <g className="plot-area" />
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
}
