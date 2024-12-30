interface IProps {
  id: string;
  label: string;
}

const InputForm = ({ id, label }: IProps) => {
  return (
    <div>
      <div className="mb-3">
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <input
          id={id}
          type={id === "upload_Image" ? "file" : "text"}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required
        />
      </div>
    </div>
  );
};

export default InputForm;
