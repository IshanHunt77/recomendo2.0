import React from 'react';

interface HeadingProps {
  label: string;
}

export const Heading: React.FC<HeadingProps> = ({ label }) => {
  return (
    <div className="justify-center text-orange-500 text-4xl font-bold mb-4">
      {label}
    </div>
  );
};
