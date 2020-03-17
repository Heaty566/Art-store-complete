import React from "react";
import { Link } from "react-router-dom";
import config from "../../../config/main.json";

import { toUpperCase } from "../../../utils/toUpperCase";

const NavBtnList = ({ data }) => {
  const url = config.navbar.navbarExtra.btnList.url;
  return (
    <ul className="navbar__btnList">
      {data.map(item => {
        const label = toUpperCase(item.name);

        return (
          <li key={item._id}>
            <Link to={`${url}/${item._id}`}>{label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavBtnList;
