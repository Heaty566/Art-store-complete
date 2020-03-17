import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from "@fortawesome/free-regular-svg-icons";

const FormFile = ({ data, label, name, onChange }) => {
  return (
    <div className="selectFile__container">
      <input type="file" name={name} id={name} onChange={onChange} />
      <label htmlFor={name}>
        {data.name ? data.name : label} <FontAwesomeIcon icon={faFileImage} />
      </label>
    </div>
  );
};

export default FormFile;
