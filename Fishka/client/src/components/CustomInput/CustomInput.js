import React, { useState } from "react";
import './CustomInput.scss'

const CustomInput = ({ placeholder, onValueChange, type }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onValueChange(newValue, placeholder); // Передаем значение обратно
  };    

  const inputType = type ? type : "text"

  return (
    <input
      type={inputType}
      value={inputValue}
      onChange={handleChange}
      placeholder={placeholder}
        className="custom_input"
    />
  );
};

export default CustomInput;