import React from "react";

import { Link } from "react-router-dom";

const FormSocial = ({ data = [] }) => {
  return (
    <ul className="socials__container">
      {data.map(item => (
        <li key={item.brand}>
          <Link to={item.url}>
            <img src={item.image} alt={item.brand} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default FormSocial;
