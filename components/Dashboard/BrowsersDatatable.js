import { useMetadata } from "../../lib/hooks/useMetadata";
import { Datatable } from "../Datatable/Datatable";

export function BrowsersDatatable(props) {
  const { data, isLoading, isError } = useMetadata("browser", props.filters);
  const isLoaded = !isLoading && !isError;

  if (!isLoaded) {
    return null;
  }

  return <Datatable title="Browsers" rows={data} />;
}
