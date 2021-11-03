export function Card(props) {
  const classes = (...args) => args.filter(Boolean).join(" ");
  const classNames = classes("w-full border border-gray-400", props.className);

  return <div className={classNames}>{props.children}</div>;
}
