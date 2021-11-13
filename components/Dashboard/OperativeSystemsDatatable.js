import { Datatable } from "../Datatable/Datatable";

export function OperativeSystemsDatatable(props) {
  const operativeSystems = [
    {
      element: "Windows",
      views: "100",
      unique: "12",
    },

    {
      element: "Mac",
      views: "40",
      unique: "2",
    },

    {
      element: "Linux",
      views: "30",
      unique: "1",
    },

    {
      element: "Android",
      views: "20",
      unique: "1",
    },

    {
      element: "IOS",
      views: "10",
      unique: "1",
    },
  ];

  return <Datatable title="Operative Systems" rows={operativeSystems} />;
}
