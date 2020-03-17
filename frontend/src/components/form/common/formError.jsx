import React from "react";

const FormError = ({ label }) => {
  return label ? (
    <div className="error__container">
      <p>{label}</p>
    </div>
  ) : null;
};

export default FormError;
