import React from "react";

const FormBtn = ({ label, type }) => {
  return (
    <div className="btn__container">
      <button type={type}>{label}</button>
    </div>
  );
};

export default FormBtn;
