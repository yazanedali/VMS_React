import React from "react";

interface IProps {
  id: string;
  label: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputForm = ({ id, label, value, name, onChange }: IProps) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <div>
      <div className="mb-3">
        <label
          htmlFor={id}
          className="text-sm font-medium  text-white"
        >
          {label}
        </label>
        <input
          onChange={handleInputChange}
          name={name}
          value={ value} 
          id={id}
          type={"text"}
          className=" text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          required
        />
      </div>
    </div>
  );
};

export default InputForm;