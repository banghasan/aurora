import { useMetadata } from "../../lib/hooks/useMetadata";
import { Datatable } from "../Datatable/Datatable";

export function DevicesDatatable(props) {
  const { data, isLoading, isError } = useMetadata("device", props.filters);
  const isLoaded = !isLoading && !isError;

  if (!isLoaded) {
    return null;
  }

  return <Datatable title="Devices" rows={data} />;
}
