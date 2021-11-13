import { Datatable } from "../Datatable/Datatable";

export function PagesDatatable(props) {
  const pages = [
    {
      element: "/",
      views: "1400",
      unique: "1000",
    },
    {
      element: "/about",
      views: "1200",
      unique: "400",
    },
  ];

  return <Datatable title="Pages" rows={pages} />;
}
