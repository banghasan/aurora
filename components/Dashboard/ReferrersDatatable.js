import { useMetadata } from "../../lib/hooks/useMetadata";
import { Datatable } from "../Datatable/Datatable";

export function ReferrersDatatable(props) {
  const { data, isLoading, isError } = useMetadata("referrer", props.filters);
  const isLoaded = !isLoading && !isError;

  if (!isLoaded) {
    return null;
  }

  return <Datatable title="Referrers" rows={data} />;
}
