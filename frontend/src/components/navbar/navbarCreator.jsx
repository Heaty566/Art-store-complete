import React, { Component } from "react";
import "./navbarCreator.scss";

import NavBrand from "./common/navBrand";
import NavSearchBox from "./common/navSearchBox";
import NavBtnGroup from "./common/navBtnGroup";
import NavUser from "./common/navUser";
import NavBtnList from "./common/navBtnList";
import NavBugerMenu from "./common/navBurgerMenu";

class NavbarCreator extends Component {
  state = {};
  renderBrand = (imageUrl, label, url) => {
    return <NavBrand imageUrl={imageUrl} label={label} url={url} />;
  };

  renderSearchBox = searchBoxValues => {
    return <NavSearchBox searchValues={searchBoxValues} />;
  };

  renderBtnGroup = btnGroup => {
    return <NavBtnGroup data={btnGroup} />;
  };

  renderUser = (user, logout) => {
    return <NavUser data={user} logout={logout} />;
  };

  renderBtnList = (btnList, updateData, getData) => {
    return (
      <NavBtnList data={btnList} getData={getData} updateData={updateData} />
    );
  };

  renderBurgerMenu = (
    searchBoxValues,
    btnGroup,
    btnList,
    logout,
    getDataBtnList
  ) => {
    return (
      <NavBugerMenu
        searchValues={searchBoxValues}
        btnList={btnList}
        btnGroup={btnGroup}
        logout={logout}
        getDataBtnList={getDataBtnList}
      />
    );
  };
}

export default NavbarCreator;
