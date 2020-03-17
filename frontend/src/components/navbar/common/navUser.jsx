import React from "react";
import { Link } from "react-router-dom";

import config from "../../../config/main.json";
import { toUpperCase } from "../../../utils/toUpperCase";

const NavUser = ({ data = {}, logout }) => {
  const label = toUpperCase(data.username);
  const { userUrl, addImage, logoutUrl } = config.navbar.navbarMain.btnUser;

  return (
    <ul className="navbar__btnGroup">
      <li>
        <Link to={userUrl + "/profile"}>{label}</Link>
      </li>

      <li>
        <Link to={addImage}>Add image</Link>
      </li>

      <li>
        <Link to={logoutUrl} onClick={logout}>
          Logout
        </Link>
      </li>
    </ul>
  );
};

export default NavUser;
