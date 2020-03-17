import React, { Component } from "react";

import "./imageShow.scss";
import { toUpperCase } from "../../utils/toUpperCase";
import { connect } from "../../stores/connect/global";
import BtnLink from "./common/btnLink";

class Image extends Component {
  state = {
    image: {}
  };

  render() {
    const { data, url, user } = this.props;
    const newAuthor = toUpperCase(data.author);
    const newGenre = toUpperCase(data.genre);

    return (
      <div className="imageProduct__container">
        <div className="imageProduct__main">
          <img
            src={`${url.imageUrl}/${data.authorId}/${data.url}`}
            alt={data.title}
          />
        </div>
        <div className="imageProduct__detail">
          <div className="detail__row">
            <h2>{data.title}</h2>
          </div>
          <div className="detail__row">
            <h4>Author:</h4>
            <p>{newAuthor}</p>
          </div>
          <div className="detail__row">
            <h4>Genre:</h4>
            <p>{newGenre}</p>
          </div>
          <div className="detail__row">
            <h4>Date:</h4>
            <p>{data.date}</p>
          </div>
          <div className="detail__row">
            <h4>Status:</h4>
            <p>{data.status ? "Available" : "Unavailable"}</p>
          </div>
          <div className="detail__row">
            <h4>Price:</h4>
            <p>{data.price}</p>
          </div>

          <div className="detail__row">
            <h4>Desciption:</h4>
            <p>{data.description}</p>
          </div>

          <div className="detail__row">
            <BtnLink
              label="Order"
              url={`${url.imageOrder}/${data._id}/order`}
            />
          </div>
          {data.authorId === user.user._id ? (
            <div className="detail__row">
              <BtnLink
                label="Update"
                url={`${url.updateImageUrl}/${data._id}`}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default connect(Image);
