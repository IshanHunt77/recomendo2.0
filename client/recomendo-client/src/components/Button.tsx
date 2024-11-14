import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ButtonProps {
  label: string;
  navigateTo:string
}

export const ButtonComponent: React.FC<ButtonProps> = ({ label,navigateTo }) => {
  const navigate = useNavigate()
  const handleNavigate = ()=>{
    navigate(navigateTo)
  }
  return (
    <button className="bg-lime-600 text-white font-semibold text-lg py-2 px-4 mt-4  rounded" onClick={handleNavigate}>
      {label}
    </button>
  );
};
