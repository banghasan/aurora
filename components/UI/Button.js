export function Button(props) {
  const { type, label, ...rest } = props;

  return (
    <button
      {...rest}
      type={type}
      className="w-full flex justify-center py-3 px-5 border border-transparent shadow-sm text-sm sm:text-base font-medium text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
    >
      {label}
    </button>
  );
}

Button.defaultProps = {
  type: "button",
};
