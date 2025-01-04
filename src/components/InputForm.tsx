import React, { useState } from "react";

interface IProps {
  id: string;
  label: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputForm = ({ id, label, value, name, onChange }: IProps) => {
  // إدارة حالة الملف (اختياري إذا كان المكون يستخدم للرفع فقط)
  const [file, setFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (id === "urlmage" && e.target.files) {
      setFile(e.target.files[0]);
    }
    onChange(e); // استدعاء الوظيفة التي تم تمريرها كخاصية
  };

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
          onChange={handleInputChange}
          name={name}
          value={id === "urlmage" ? undefined : value} // إزالة القيمة إذا كان النوع "file"
          id={id}
          type={id === "urlmage" ? "file" : "text"}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required
        />
      </div>
    </div>
  );
};

export default InputForm;