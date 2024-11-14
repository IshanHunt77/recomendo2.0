import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  label: string;
  buttonLabel: string;
  navigateTo: string;
}

export const AlreadyAccount: React.FC<Props> = ({ label, buttonLabel, navigateTo }) => {
  const navigate = useNavigate();
  
  const handleNavigate = () => {
    navigate(navigateTo);
  };

  return (
    <div className="flex justify-center text-center mt-2">
      <div className="text-sm text-gray-700 mr-1">{label}</div>
      <button className="font-semibold text-gray-700" onClick={handleNavigate}>
        {buttonLabel}
      </button>
    </div>
  );
};
