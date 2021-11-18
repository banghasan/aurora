import Chart from "react-apexcharts";

export default function ViewsChart(props) {
  return (
    <Chart
      options={{
        chart: {
          fontFamily: "inherit",
          parentHeightOffset: 0,
          toolbar: {
            show: false,
          },
          animations: {
            enabled: true,
          },
          stacked: true,
        },
        plotOptions: {
          bar: {
            columnWidth: "80%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          opacity: 1,
        },
        grid: {
          padding: {
            top: -20,
            right: 0,
            left: -4,
            bottom: 20,
          },
          strokeDashArray: 4,
          xaxis: {
            lines: {
              show: true,
            },
            labels: {
              datetimeUTC: false,
            },
          },
        },
        xaxis: {
          labels: {
            padding: 0,
          },
          tooltip: {
            enabled: false,
          },
          axisBorder: {
            show: false,
          },
          type: "datetime",
        },
        tooltip: {
          enabled: true,
          followCursor: false,
          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            const data = w.globals.initialSeries[seriesIndex];

            return `
              <div class="bg-black opacity-75 text-white px-6 py-4 font-medium">
                <span>${data.name}: ${series[seriesIndex][dataPointIndex]}</span>
              </div>
            `;
          },
        },
        yaxis: {
          labels: {
            padding: 4,
          },
        },
        labels: [
          "2021-01-01T00:00:00.000Z",
          "2021-01-01T01:00:00.000Z",
          "2021-01-01T02:00:00.000Z",
          "2021-01-01T03:00:00.000Z",
          "2021-01-01T04:00:00.000Z",
          "2021-01-01T05:00:00.000Z",
          "2021-01-01T06:00:00.000Z",
          "2021-01-01T07:00:00.000Z",
          "2021-01-01T08:00:00.000Z",
          "2021-01-01T09:00:00.000Z",
          "2021-01-01T10:00:00.000Z",
          "2021-01-01T11:00:00.000Z",
          "2021-01-01T12:00:00.000Z",
          "2021-01-01T13:00:00.000Z",
          "2021-01-01T14:00:00.000Z",
          "2021-01-01T15:00:00.000Z",
          "2021-01-01T16:00:00.000Z",
          "2021-01-01T17:00:00.000Z",
          "2021-01-01T18:00:00.000Z",
          "2021-01-01T19:00:00.000Z",
          "2021-01-01T20:00:00.000Z",
          "2021-01-01T21:00:00.000Z",
          "2021-01-01T22:00:00.000Z",
          "2021-01-01T23:00:00.000Z",
        ],
        colors: ["#79a6dc", "#bfe399"],
        legend: {
          show: true,
          fontSize: "16px",
          itemMargin: {
            horizontal: 10,
            vertical: 0,
          },
          markers: {
            width: 14,
            height: 14,
            offsetX: -4,
            offsetY: 0,
          },
        },
      }}
      series={[
        {
          name: "Page Views",
          data: [
            8, 22, 6, 8, 6, 4, 1, 8, 24, 29, 51, 40, 47, 23, 26, 50, 26, 41, 22,
            46, 47, 81, 46, 6,
          ],
        },
        {
          name: "Unique Visitors",
          data: [
            2, 6, 7, 7, 1, 5, 5, 2, 12, 4, 6, 18, 3, 5, 2, 13, 15, 20, 47, 18,
            15, 11, 10, 0,
          ],
        },
      ]}
      type="bar"
      height={500}
    />
  );
}
