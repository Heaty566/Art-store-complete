import React from "react";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import Joi from "joi";
import "./formImage.scss";

import config from "../../config/main.json";
import { getGenres } from "../../service/genreService";
import {
  userAddImage,
  userUpdateImage,
  userDeleteImage
} from "../../service/imageUserService";
import { getImage } from "../../service/imageService";
import { connect } from "../../stores/connect/global";
import FormCreator from "../../components/form/formCreator";

class FormImage extends FormCreator {
  state = {
    form: {
      title: "",
      price: "",
      genreId: "",
      description: "",
      image: "Chose Image"
    },
    genres: [],
    error: ""
  };

  async componentDidMount() {
    const { data } = (await getGenres()) || [];
    const { params } = this.props.match;

    if (params.imageId) this.setupOnUpdateImage();
    data.unshift({ name: "genre", _id: "all" });

    this.setState({ genres: data });
  }

  setupOnUpdateImage = async () => {
    let { form } = this.state;
    const { match, history } = this.props;
    const { data: image } = await getImage(match.params.imageId);
    if (!image) return history.push("/home");

    form = _.pick(image, ["title", "price", "genreId", "description"]);
    form.image = image.url;

    document.getElementById(
      "main-image"
    ).src = `/images/${image.authorId}/${image.url}`;

    this.setState({ form });
  };

  schema = {
    title: Joi.string()
      .max(30)
      .min(1)
      .label("Title")
      .required(),
    price: Joi.number()
      .min(0)
      .max(10000)
      .label("Price"),
    genreId: Joi.string()
      .label("Genre")
      .required(),
    image: Joi.label("Image").required(),

    description: Joi.string()
      .allow("")
      .max(400)
      .label("Description")
  };

  submitForm = async () => {
    let { form } = this.state;
    const { match, user } = this.props;

    if (typeof form.image !== "object" && !match.params.imageId) {
      this.setState({ error: "Image is required." });
      return;
    }

    if (match.params.imageId) {
      delete form.image;
      const result = await userUpdateImage(
        match.params.imageId,
        form,
        user.token
      );
      this.handleAfterSubmit(result);
    } else {
      const image = new FormData();
      for (let item in form) {
        image.append(item, form[item]);
      }
      const result = await userAddImage(image, user.token);
      this.handleAfterSubmit(result);
    }
  };

  handleOnDeleteImage = async () => {
    const { match, history, user } = this.props;

    const result = await userDeleteImage(match.params.imageId, user.token);

    if (result.error) {
      this.setState({ error: result.error });
    } else {
      history.push(`/home`);
    }
  };

  handleAfterSubmit = result => {
    const { imageUrl } = config.formImage;
    const { match, history } = this.props;
    if (result.error) {
      this.setState({ error: result.error });
    } else {
      history.push(`${imageUrl}/${match.params.imageId}`);
    }
  };

  render() {
    const { form, genres, error } = this.state;
    const { params } = this.props.match;

    return (
      <div className="form__container">
        <div className="addImage__grid">
          <div className="image__container">
            <img src="/page/imageDefault.jpg" alt="" id="main-image" />
          </div>
          <form className="addImage__container" onSubmit={this.handleOnSubmit}>
            <div className="form__group">
              <p className="form__name">
                {params.imageId ? "Update Image" : "New Image"}
              </p>
            </div>
            <div className="form__group">{this.renderError(error)}</div>
            <div className="form__group">
              {this.renderInput("title", "Title", form.title)}
            </div>
            <div className="form__group">
              {this.renderSelectList(genres, "genreId", form.genreId)}
            </div>
            <div className="form__group">
              {this.renderInput("price", "Price $", form.price)}
            </div>
            <div className="form__group">
              {params.imageId
                ? null
                : this.renderSelectFile(form.image, form.image, "image")}
            </div>
            <div className="form__group">
              {this.renderTextArea(
                "description",
                "Desciption",
                form.description,
                400
              )}
            </div>
            <div className="form__group">
              {params.imageId
                ? this.renderBtn("Update")
                : this.renderBtn("Upload")}
            </div>
            <div className="form__group">
              {params.imageId
                ? this.renderBtnFunction("Delete", this.handleOnDeleteImage)
                : null}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(FormImage));
