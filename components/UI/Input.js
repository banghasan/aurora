export function Input(props) {
  const id = props.id ? props.id : props.name;

  return (
    <div className="w-full">
      <label htmlFor={id} className="block font-medium text-gray-700">
        {props.label}
      </label>

      <div className="mt-1">
        <input
          id={id}
          name={props.name}
          type={props.type}
          className="block w-full px-4 py-3 border border-gray-300 shadow-sm text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-gray-900 focus:border-gray-900"
        />
      </div>
    </div>
  );
}

Input.defaultProps = {
  type: "text",
};
