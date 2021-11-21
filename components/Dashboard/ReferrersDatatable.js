import { useMetadata } from "../../lib/hooks/useMetadata";
import { Datatable } from "../Datatable/Datatable";

export function ReferrersDatatable(props) {
  // TODO: wid
  const { data, isLoading, isError } = useMetadata(
    "ckw989nb00000e4glkkunxh8c",
    "referrer"
  );

  const isLoaded = !isLoading && !isError;

  if (!isLoaded) {
    return null;
  }

  return <Datatable title="Referrers" rows={data} />;
}
