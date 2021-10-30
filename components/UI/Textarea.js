export function Textarea(props) {
  const id = props.id ? props.id : props.name;

  return (
    <div>
      <label for={id} className="block font-medium text-gray-700">
        {props.label}
      </label>

      <div className="mt-1">
        <textarea
          id={id}
          name={props.name}
          rows={props.rows}
          className="block w-full px-4 py-3 border border-gray-300 shadow-sm text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-gray-900 focus:border-gray-900"
        />
      </div>
    </div>
  );
}

Textarea.defaultProps = {
  rows: 5,
};