import { COLORS } from "../../utils/constants";

export function Dot(props) {
  return (
    <svg
      className={`-ml-0.5 mr-1.5 h-2 w-2 text-${props.color}-400`}
      fill="currentColor"
      viewBox="0 0 8 8"
    >
      <circle cx={4} cy={4} r={3} />
    </svg>
  );
}

export function Filter(props) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-${props.color}-100 text-${props.color}-800`}
    >
      <Dot color={props.color} />
      {props.label}: {props.value}
    </span>
  );
}

export function Filters(props) {
  // I don't wanna these params be visible
  const { wid, start, end, unit, ...whitelisted } = props.filters;

  const filters = Object.keys(whitelisted);
  const mappedFilters = filters.map((label, index) => {
    const value = props.filters[label];
    const color = COLORS[index % COLORS.length];

    return <Filter key={label} label={label} value={value} color={color} />;
  });

  return (
    <div className="flex-grow space-x-3 justify-between">{mappedFilters}</div>
  );
}

Filters.defaultProps = {
  filters: {},
};
