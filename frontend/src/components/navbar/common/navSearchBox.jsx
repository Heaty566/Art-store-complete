import React, { Component } from "react";
import _ from "lodash";
import config from "../../../config/main.json";
import { Link, withRouter } from "react-router-dom";

class NavSearchBox extends Component {
  state = {
    value: "",
    results: [],
    currentSelect: -1
  };

  handleOnClickSearch = async index => {
    const { results } = this.state;
    const { urlSearch } = config.navbar.navbarMain.searchBox;

    this.props.history.push(`${urlSearch}/${results[index]._id}`);
  };

  handleOnKeydownSearch = async event => {
    let { currentSelect, results, value } = this.state;
    const { urlSearch } = config.navbar.navbarMain.searchBox;
    const { limits } = config.navbar.navbarMain.searchBox;

    switch (event.keyCode) {
      case 13:
        if (currentSelect === -1) {
          this.props.history.push(`${urlSearch}/${value}`);
        } else {
          this.props.history.push(`${urlSearch}/${results[currentSelect]._id}`);
        }
        break;
      case 38:
        currentSelect--;
        if (currentSelect < 0)
          currentSelect =
            results.length < limits ? results.length - 1 : limits - 1;

        break;
      case 40:
        currentSelect++;
        if (currentSelect > limits - 1 && results.length > limits)
          currentSelect = 0;
        if (currentSelect > results.length - 1 && results.length < limits)
          currentSelect = 0;
        break;
      default:
        break;
    }

    this.setState({ currentSelect });
  };

  handleOnMouseEnterSearch = index => {
    let { currentSelect } = this.state;
    currentSelect = index;

    this.setState({ currentSelect });
  };

  handleOnMouseLeave = () => {
    let { currentSelect } = this.state;
    currentSelect = -1;

    this.setState({ currentSelect });
  };

  handleOnBlurSearch = () => {
    let { currentSelect } = this.state;
    currentSelect = -1;

    this.setState({ currentSelect });
  };

  handleOnChangeSearch = async ({ currentTarget: input }) => {
    let { value, currentSelect } = this.state;
    value = input.value;
    currentSelect = -1;
    const { data: results } = value
      ? await this.props.searchValues(value)
      : { data: [] };

    this.setState({ value, results, currentSelect });
  };

  render() {
    const { url, limits, urlSearch } = config.navbar.navbarMain.searchBox;
    const { value, results, currentSelect } = this.state;

    const filters = _(results)
      .slice(0)
      .take(limits)
      .value();

    return (
      <div
        className="navbar__searchBox"
        onKeyDown={this.handleOnKeydownSearch}
        onBlur={this.handleOnBlurSearch}
      >
        <div className="searchBox__input">
          <img src={url} alt="icon" className="searchBox__icon" />
          <input
            value={value}
            type="text"
            placeholder="Search"
            onChange={this.handleOnChangeSearch}
          />
        </div>
        <ul
          className="searchBox__result"
          onMouseLeave={this.handleOnMouseLeave}
        >
          {filters.map((item, index) => {
            const className =
              index === currentSelect ? "searchBox__result-active" : "";
            return (
              <li key={item._id}>
                <Link
                  className={className}
                  to={`${urlSearch}/${item._id}`}
                  onClick={() => this.handleOnClickSearch(index)}
                  onMouseEnter={() => this.handleOnMouseEnterSearch(index)}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default withRouter(NavSearchBox);
