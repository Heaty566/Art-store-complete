import React from "react";
import { Link } from "react-router-dom";

const NavBrand = ({ imageUrl, label, url }) => {
  return (
    <div className="navbar__brand">
      <Link to={url}>
        <img src={imageUrl} alt="brand" />
        <label>{label}</label>
      </Link>
    </div>
  );
};

export default NavBrand;
