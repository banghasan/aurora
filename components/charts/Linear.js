import dynamic from "next/dynamic";
import { ProgressList } from "../ProgressList";
import { useGraph } from "../../hooks/useGraph";

const Loader = dynamic(() => import("../Loader").then((mod) => mod.Loader), { ssr: false });

export const Linear = ({ title, url, timeRange }) => {
  const { graph, isLoading, isError } = useGraph(url, timeRange);

  if (isLoading) return <Loader width={340} height={548} />;
  if (isError) return <div>failed to load</div>;

  return <ProgressList title={title} data={graph} />;
};
