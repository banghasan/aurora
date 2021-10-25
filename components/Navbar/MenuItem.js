import Link from "next/link";

export function MenuItem(props) {
  return (
    <Link href={props.href}>
      <a className="text-base font-medium px-2 md:px-3 py-2 text-gray-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
        {props.label}
      </a>
    </Link>
  );
}
