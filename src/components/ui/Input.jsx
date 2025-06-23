// src/components/ui/Input.jsx
import React from 'react';

const Input = ({ type = 'text', value, onChange, placeholder, className = '' }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-400 ${className}`}
    />
  );
};

export default Input;
