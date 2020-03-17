import React from "react";
import { withRouter } from "react-router-dom";
import Joi from "joi";

import config from "../../config/main.json";
import FormCreator from "../../components/form/formCreator";
import { setCookie } from "../../utils/cookie";
import { connect } from "../../stores/connect/global";
import { register, getMe } from "../../service/userService";

class Register extends FormCreator {
  state = {
    form: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirm: ""
    },
    formExtra: {
      password: false,
      confirm: false
    },
    error: ""
  };

  schema = {
    name: Joi.string()
      .max(20)
      .min(3)
      .trim()
      .label("Full Name")
      .required(),
    username: Joi.string()
      .max(20)
      .min(3)
      .trim()
      .label("Username")
      .alphanum()
      .lowercase()
      .required(),
    email: Joi.string()
      .max(30)
      .min(3)
      .trim()
      .label("Email")
      .email()
      .required(),
    password: Joi.string()
      .max(255)
      .min(8)
      .alphanum()
      .label("Password")
      .trim()
      .required(),
    confirm: Joi.string()
      .max(255)
      .min(8)
      .alphanum()
      .label("Confirm")
      .trim()
      .valid(Joi.ref("password"))
      .required()
  };

  submitForm = async () => {
    const { form, formExtra } = this.state;
    const { loginUser } = this.props;
    const result = await register(form);

    if (result.error) {
      this.setState({ error: result.error });
    } else {
      const { data: user } = await getMe(result.data);
      loginUser(result.data, user);
      setCookie("x-auth-token", result.data, formExtra.isRemember ? 30 : 1);
      this.props.history.push("/home");
    }
  };

  render() {
    const { socialsNetwork, brand } = config.formCreator;
    const { loginInstead } = config.register;
    const { form, formExtra, error } = this.state;

    return (
      <div className="form__container">
        <form className="register__container" onSubmit={this.handleOnSubmit}>
          <div className="form__group">{this.renderBrand(brand)}</div>
          <div className="form__group">
            <p className="form__name">Sign Up</p>
          </div>
          <div className="form__group">{this.renderError(error)}</div>
          <div className="form__group">
            {this.renderInput("name", "Name", form.name)}
          </div>
          <div className="form__group">
            {this.renderInput("username", "Username", form.username)}
          </div>
          <div className="form__group">
            {this.renderInput("email", "Email", form.email)}
          </div>
          <div className="form__group">
            {this.renderPassword(
              "password",
              "Password",
              form.password,
              formExtra.password
            )}
          </div>
          <div className="form__group">
            {this.renderPassword(
              "confirm",
              "Confirm",
              form.confirm,
              formExtra.confirm
            )}
          </div>

          <div className="form__group">{this.renderBtn("Register")}</div>
          <div className="form__group">{this.renderSocial(socialsNetwork)}</div>
          <div className="form__group">
            {this.renderLink("Login Instead", loginInstead)}
          </div>
        </form>
      </div>
    );
  }
}

export default connect(withRouter(Register));
