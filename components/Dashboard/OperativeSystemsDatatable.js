import { useMetadata } from "../../lib/hooks/useMetadata";
import { Datatable } from "../Datatable/Datatable";

export function OperativeSystemsDatatable(props) {
  // TODO: wid
  const { data, isLoading, isError } = useMetadata(
    "ckw989nb00000e4glkkunxh8c",
    "os"
  );

  const isLoaded = !isLoading && !isError;

  if (!isLoaded) {
    return null;
  }

  return <Datatable title="Operative Systems" rows={data} />;
}
