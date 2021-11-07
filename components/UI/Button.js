import Link from "next/link";
import { tailwind } from "../../utils/tailwind";
export function Button(props) {
  const { type, label, isLoading, variant, href, ...rest } = props;

  const isClassic = variant === "classic";
  const isOutline = variant === "outline";

  const classNames = tailwind`
    w-full
    flex
    justify-center
    py-3
    px-5
    shadow-sm
    text-sm
    sm:text-base
    font-medium
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
    focus:ring-black

    ${isOutline && "text-gray-900 bg-white border border-gray-900"}
    ${isClassic && "text-white bg-gray-900 disabled:bg-gray-700"}
  `;

  if (props.role === "button") {
    return (
      <button {...rest} type={type} className={classNames}>
        {isLoading ? "Submitting.." : label}
      </button>
    );
  }

  return (
    <Link href={href}>
      <a {...rest} className={classNames}>
        {label}
      </a>
    </Link>
  );
}

Button.defaultProps = {
  type: "button",
  variant: "classic",
  isLoading: false,
  role: "button",
};
