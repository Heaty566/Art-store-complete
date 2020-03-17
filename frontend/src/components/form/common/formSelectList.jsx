import React from "react";

import { toUpperCase } from "../../../utils/toUpperCase";

const FormSelectList = ({ data = [], onChange, name, selected }) => {
  return (
    <select
      className="selectList__container"
      onChange={onChange}
      name={name}
      value={selected}
    >
      {data.map(item => {
        const newLabel = toUpperCase(item.name);

        return (
          <option key={item._id} value={item._id} className="default">
            {newLabel}
          </option>
        );
      })}
    </select>
  );
};

export default FormSelectList;
