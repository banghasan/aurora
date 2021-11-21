import { useMetadata } from "../../lib/hooks/useMetadata";
import { Datatable } from "../Datatable/Datatable";

export function OperativeSystemsDatatable(props) {
  const { data, isLoading, isError } = useMetadata("os", props.filters);
  const isLoaded = !isLoading && !isError;

  if (!isLoaded) {
    return null;
  }

  return <Datatable title="Operative Systems" rows={data} />;
}
