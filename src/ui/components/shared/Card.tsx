import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white text-gray-800 rounded-lg shadow-lg p-4 h-full ${className}`}>
      {children}
    </div>
  );
};

export default Card;