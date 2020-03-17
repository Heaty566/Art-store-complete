import React from "react";
import { Link } from "react-router-dom";

const FormLink = ({ label, url }) => {
  return (
    <div className="link__container">
      <Link to={url}>{label}</Link>
    </div>
  );
};

export default FormLink;
