import React from "react";
import { Link } from "react-router-dom";

const NavBtnGroup = ({ data = [] }) => {
  return (
    <ul className="navbar__btnGroup">
      {data.map(item => {
        return (
          <li key={item.label}>
            <Link to={item.url}>{item.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavBtnGroup;
