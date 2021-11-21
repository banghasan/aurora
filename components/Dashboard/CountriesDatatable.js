import { useMetadata } from "../../lib/hooks/useMetadata";
import { Datatable } from "../Datatable/Datatable";

export function CountriesDatatable(props) {
  const { data, isLoading, isError } = useMetadata("locale", props.filters);
  const isLoaded = !isLoading && !isError;

  if (!isLoaded) {
    return null;
  }

  return <Datatable title="Countries" rows={data} />;
}
