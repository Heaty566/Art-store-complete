import React from "react";

const FormCheckBox = ({ label, name, onClick, value }) => {
  return (
    <div className="checkBox__container">
      <input
        type="checkbox"
        id={name}
        name={name}
        onClick={onClick}
        value={value}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default FormCheckBox;
