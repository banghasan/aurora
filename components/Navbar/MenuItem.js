import Link from "next/link";

export function MenuItem(props) {
  const classNames =
    "text-base font-medium px-2 md:px-3 py-2 text-gray-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2";

  if (props.role === "button") {
    return (
      <button className={classNames} onClick={props.onClick}>
        {props.label}
      </button>
    );
  }

  return (
    <Link href={props.href}>
      <a className={classNames}>{props.label}</a>
    </Link>
  );
}

MenuItem.defaultProps = {
  role: "link",
};
