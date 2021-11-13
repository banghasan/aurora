import { Datatable } from "../Datatable/Datatable";

export function CountriesDatatable(props) {
  const countries = [
    {
      element: "United States",
      views: "100",
      unique: "12",
    },

    {
      element: "United Kingdom",
      views: "40",
      unique: "2",
    },

    {
      element: "Germany",
      views: "30",
      unique: "1",
    },

    {
      element: "France",
      views: "20",
      unique: "1",
    },

    {
      element: "Italy",
      views: "10",
      unique: "1",
    },

    {
      element: "Spain",
      views: "10",
      unique: "1",
    },
  ];

  return <Datatable title="Countries" rows={countries} />;
}
