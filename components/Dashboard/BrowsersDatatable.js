import { Datatable } from "../Datatable/Datatable";

export function BrowsersDatatable(props) {
  const browsers = [
    {
      element: "Chrome",
      views: "100",
      unique: "12",
    },

    {
      element: "Firefox",
      views: "40",
      unique: "2",
    },

    {
      element: "Safari",
      views: "30",
      unique: "1",
    },

    {
      element: "Opera",
      views: "20",
      unique: "1",
    },
    {
      element: "Edge",
      views: "10",
      unique: "1",
    },
    {
      element: "IE",
      views: "10",
      unique: "1",
    },
  ];

  return <Datatable title="Browsers" rows={browsers} />;
}
