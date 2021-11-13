import { forwardRef } from "react";

export const Select = forwardRef((props, ref) => {
  const id = props.id ? props.id : props.name;
  const options = props.options.map((option) => {
    return (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    );
  });

  return (
    <div className="w-full">
      <label htmlFor={id} className="block font-medium text-gray-700">
        {props.label}
      </label>

      <div className={props.label && "mt-1"}>
        <select
          ref={ref}
          id={id}
          name={props.name}
          onChange={props.onChange}
          onBlur={props.onBlur}
          className="block w-full px-4 py-3 border border-gray-300 shadow-sm text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-gray-900 focus:border-gray-900"
        >
          {options}
        </select>
      </div>
    </div>
  );
});

Select.defaultProps = {
  options: [],
};
