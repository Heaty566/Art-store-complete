import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

const FormPassword = ({
  onChange,
  name,
  label,
  value,
  isSee,
  onSeePassword
}) => {
  return (
    <div className="password__container">
      <input
        onChange={onChange}
        id={name}
        name={name}
        value={value}
        placeholder={label}
        type={isSee ? "text" : "password"}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
      />

      <FontAwesomeIcon
        icon={isSee ? faEye : faEyeSlash}
        name={name}
        onClick={() => onSeePassword(name)}
      />
    </div>
  );
};

export default FormPassword;
