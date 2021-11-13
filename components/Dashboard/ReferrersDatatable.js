import { Datatable } from "../Datatable/Datatable";

export function ReferrersDatatable(props) {
  const referrers = [
    {
      element: "https://d3ward.github.io/",
      views: "100",
      unique: "12",
    },
    {
      element: "https://alternativeto.net/",
      views: "40",
      unique: "2",
    },
    {
      element: "https://www.google.com/",
      views: "30",
      unique: "1",
    },
    {
      element: "https://www.facebook.com/",
      views: "20",
      unique: "1",
    },
    {
      element: "https://www.youtube.com/",
      views: "10",
      unique: "1",
    },
  ];

  return <Datatable title="Referrers" rows={referrers} />;
}
