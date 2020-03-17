import React from "react";

const FormTextArea = ({ value = "", name, limits, label, onChange }) => {
  const charactersLeft = limits - value.length;

  return (
    <div className="textArea__container">
      <textarea
        value={value}
        name={name}
        id={name}
        maxLength={limits}
        placeholder={label}
        onChange={onChange}
      ></textarea>
      <p>
        {charactersLeft}/{limits}
      </p>
    </div>
  );
};

export default FormTextArea;
