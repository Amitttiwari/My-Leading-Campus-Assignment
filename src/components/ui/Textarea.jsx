// src/components/ui/Textarea.jsx
import React from 'react';

const Textarea = ({ value, onChange, placeholder, rows = 4, className = '' }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-400 ${className}`}
    />
  );
};

export default Textarea;
