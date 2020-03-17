import React, { Component } from "react";
import "./imageCreator.scss";

import { Link } from "react-router-dom";

import Pagination from "./common/pagination";

class ImageCreator extends Component {
  state = {};

  renderImages = (data = [], url) => {
    if (!data.length)
      return (
        <div className="product__container">
          <div className="product__wrapper">
            <h1>No image was found.</h1>
          </div>
        </div>
      );
    return (
      <React.Fragment>
        <div className="product__container">
          <div className="product__wrapper">
            {data.map(item => (
              <div className="image__container" key={item._id}>
                <Link to={`${url}/${item._id}`}>
                  <div className="image__wrapper">
                    <img
                      src={`/images/${item.authorId}/${item.url}`}
                      alt={item.title}
                    />
                  </div>
                  <div className="image__title">
                    <p>{item.title}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  };

  handleOnlickPage = index => {
    let { currentPage } = this.state;

    currentPage = index;
    this.setState({ currentPage });
  };

  renderPagination = (length, currentPage, pageSize) => {
    return (
      <Pagination
        length={length}
        currentPage={currentPage}
        pageSize={pageSize}
        onClick={this.handleOnlickPage}
      />
    );
  };
}

export default ImageCreator;
