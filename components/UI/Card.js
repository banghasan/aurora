export function Card(props) {
  const classes = (...args) => args.filter(Boolean).join(" ");
  const classNames = classes(
    "w-full border-2 border-gray-900",
    props.className
  );

  return <div className={classNames}>{props.children}</div>;
}
