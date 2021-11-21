import { useMetadata } from "../../lib/hooks/useMetadata";
import { Datatable } from "../Datatable/Datatable";

export function DevicesDatatable(props) {
  // TODO: wid
  const { data, isLoading, isError } = useMetadata(
    "ckw989nb00000e4glkkunxh8c",
    "device"
  );

  const isLoaded = !isLoading && !isError;

  if (!isLoaded) {
    return null;
  }

  return <Datatable title="Devices" rows={data} />;
}
