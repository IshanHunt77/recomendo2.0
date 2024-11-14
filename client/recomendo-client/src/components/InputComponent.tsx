import React from "react";

interface Props {
  label: string;
  placeholder: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Corrected type for onChange
}

const InputComponent: React.FC<Props> = ({ label, placeholder, onChange }) => {
  return (
    <div className="justify-start text-left">
      <div className="text-gray-800 font-semibold text-base mb-1 ml-1">{label}</div>
      <input
        className="text-gray-400 border rounded p-2 w-full"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default InputComponent;
