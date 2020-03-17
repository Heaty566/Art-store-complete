import React from "react";

import { Link } from "react-router-dom";

const BtnLink = ({ label, url }) => {
  return (
    <div className="btn__container">
      <Link to={url}>{label}</Link>
    </div>
  );
};

export default BtnLink;
