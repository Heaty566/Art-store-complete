import React from "react";

const FormInput = ({ onChange, name, label, value, type }) => {
  return (
    <div className="input__container">
      <input
        onChange={onChange}
        id={name}
        name={name}
        value={value}
        placeholder={label}
        type={type}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
      />
    </div>
  );
};

export default FormInput;
