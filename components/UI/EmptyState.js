import { Database } from "../Icons/Database";

export function EmptyState(props) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className="relative block w-full border-2 border-gray-300 border-dashed p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <Database className="mx-auto h-12 w-12 text-gray-400" />
      <span className="mt-2 block font-medium text-gray-700">{props.text}</span>
    </button>
  );
}
