export const Input = ({ register, name, type = "text", ...rest }) => (
  <div>
    {rest.label && (
      <label className="block text-sm font-medium text-gray-600 dark:text-gray-100 mb-1">
        {rest.label}
      </label>
    )}

    <input
      {...register(name)}
      {...rest}
      type={type}
      className="text-black dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-800 rounded-md bg-white dark:bg-black dark:placeholder-gray-500"
    />
  </div>
);