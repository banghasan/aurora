export function Row(props) {
  return (
    <div className="relative py-2">
      <div
        className="absolute inset-0 h-full rounded bg-gray-100"
        style={{ width: `${props.percentage}%` }}
      />

      <div className="grid grid-cols-3 gap-4 text-sm px-3 relative">
        <dd className="truncate">{props.element}</dd>
        <dd className="text-right font-medium">{props.views}</dd>
        <dd className="text-right font-medium">{props.unique}</dd>
      </div>
    </div>
  );
}

Row.defaultProps = {
  percentage: 0,
};
