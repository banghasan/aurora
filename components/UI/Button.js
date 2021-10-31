export function Button(props) {
  const classes = (...args) => args.filter(Boolean).join(" ");
  const baseClassNames =
    "w-full flex justify-center py-3 px-5 shadow-sm text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black";

  const classicVariant = classes(
    baseClassNames,
    "text-white bg-gray-900 hover:bg-gray-700 disabled:bg-gray-700"
  );

  const invertedVariant = classes(
    baseClassNames,
    "text-gray-900 bg-white border border-gray-900"
  );

  const variant =
    props.variant === "classic" ? classicVariant : invertedVariant;

  const classNames = classes(variant, props.className);

  const { type, label, isLoading, ...rest } = props;

  return (
    <button {...rest} type={type} className={classNames}>
      {isLoading ? "Submitting.." : label}
    </button>
  );
}

Button.defaultProps = {
  type: "button",
  variant: "classic",
  isLoading: false,
};
