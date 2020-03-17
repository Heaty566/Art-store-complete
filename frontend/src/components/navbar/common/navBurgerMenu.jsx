import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import config from "../../../config/main.json";
import { connect } from "../../../stores/connect/global";
import { toUpperCase } from "../../../utils/toUpperCase";

class NavBurgerMenu extends Component {
  state = {
    isBurgerActive: false,
    searchBox: {
      value: "",
      results: []
    }
  };

  handleOnClickOutSide = () => {
    let { isBurgerActive } = this.state;
    isBurgerActive = false;

    this.setState({ isBurgerActive });
  };

  handleOnClickBurger = () => {
    let { isBurgerActive } = this.state;
    isBurgerActive = !isBurgerActive;

    this.setState({ isBurgerActive });
  };

  handleOnSearch = async event => {
    if (event.keyCode === 13) {
      const { value } = this.state.searchBox;
      const { urlSearch } = config.navbar.navbarMain.searchBox;
      this.props.history.push(`${urlSearch}/${value}`);
    }
  };

  handleOnChange = ({ currentTarget: input }) => {
    const { searchBox } = this.state;
    searchBox.value = input.value;

    this.setState({ searchBox });
  };

  render() {
    const { isBurgerActive, searchBox } = this.state;
    const { btnList, btnGroup, logout, user } = this.props;
    const { userUrl, addImage, logoutUrl } = config.navbar.navbarMain.btnUser;
    const { url: btnListUrl } = config.navbar.navbarExtra.btnList;
    const username = toUpperCase(user.user.username);

    return (
      <div className="navbar__burgerMenu">
        <div
          className={
            isBurgerActive
              ? "burgerMenu__btn burgerMenu__btn-active"
              : "burgerMenu__btn"
          }
          onClick={this.handleOnClickBurger}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div
          className={isBurgerActive ? "detectClickOutSide" : null}
          onClick={this.handleOnClickOutSide}
        ></div>
        <ul
          className={
            !isBurgerActive
              ? "burgerMenu__expand"
              : "burgerMenu__expand burgerMenu__expand-active"
          }
        >
          <input
            className="burgerMenu__search"
            placeholder="Search"
            value={searchBox.value}
            onChange={this.handleOnChange}
            onKeyDown={this.handleOnSearch}
          />
          {user.token ? (
            <React.Fragment>
              <li>
                <Link to={userUrl + "/profile"}>{username}</Link>
              </li>

              <li>
                <Link to={addImage}>Add image</Link>
              </li>

              <li>
                <Link to={logoutUrl} onClick={logout}>
                  Logout
                </Link>
              </li>
            </React.Fragment>
          ) : (
            btnGroup.map(item => {
              return (
                <li key={item.label}>
                  <Link to={item.url}>{item.label}</Link>
                </li>
              );
            })
          )}
          {btnList.map(item => {
            const label = toUpperCase(item.name);
            return (
              <li key={item._id}>
                <Link to={`${btnListUrl}/${item._id}`}>{label}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default withRouter(connect(NavBurgerMenu));
