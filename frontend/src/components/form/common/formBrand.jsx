import React from "react";
import { Link } from "react-router-dom";

const FormBrand = ({ data }) => {
  const { urlImage, url } = data;

  return (
    <div className="brand__container">
      <Link to={url}>
        <img src={urlImage} alt="brand" />
      </Link>
    </div>
  );
};

export default FormBrand;
