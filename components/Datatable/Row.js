export function Row(props) {
  return (
    <div class="relative py-2">
      <div
        class="absolute inset-0 h-full rounded bg-gray-100"
        style={{ width: `${props.percentage}%` }}
      />

      <div class="grid grid-cols-3 gap-4 text-sm px-3 relative">
        <dd className="truncate">{props.element}</dd>
        <dd class="text-right font-medium">{props.views}</dd>
        <dd class="text-right font-medium">{props.unique}</dd>
      </div>
    </div>
  );
}

Row.defaultProps = {
  percentage: 0,
};
