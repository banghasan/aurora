import { Datatable } from "../Datatable/Datatable";

export function DevicesDatatable(props) {
  const devices = [
    {
      element: "Desktop",
      views: "100",
      unique: "12",
    },

    {
      element: "Tablet",
      views: "40",
      unique: "2",
    },

    {
      element: "Mobile",
      views: "30",
      unique: "1",
    },
  ];

  return <Datatable title="Devices" rows={devices} />;
}
