// src/components/ui/Card.jsx
import React from 'react';

const Card = ({ children, onClick, className = '' }) => {
  return (
    <div
      className={`border border-gray-200 rounded shadow-sm p-3 hover:bg-gray-50 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
