import React from "react";

const FormBtnFunction = ({ label, onClick }) => {
  return (
    <div className="btnFunc__container">
      <div onClick={onClick}>{label}</div>
    </div>
  );
};

export default FormBtnFunction;
