import React from "react";
import { withRouter } from "react-router-dom";
import Joi from "joi";

import config from "../../config/main.json";
import FormCreator from "../../components/form/formCreator";
import { setCookie } from "../../utils/cookie";
import { connect } from "../../stores/connect/global";
import { login, getMe } from "../../service/userService";

class Login extends FormCreator {
  state = {
    form: {
      username: "",
      password: ""
    },
    formExtra: {
      password: false,
      isRemember: false
    },
    error: ""
  };

  schema = {
    username: Joi.string()
      .max(20)
      .min(3)
      .trim()
      .label("Username")
      .alphanum()
      .lowercase()
      .required(),
    password: Joi.string()
      .max(255)
      .min(8)
      .alphanum()
      .label("Password")
      .trim()
      .required()
  };

  submitForm = async () => {
    const { form, formExtra } = this.state;
    const { loginUser } = this.props;
    const result = await login(form);

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
    const { form, formExtra, error } = this.state;
    const { socialsNetwork, brand } = config.formCreator;
    const { forgotPasswordUrl, registerInstead } = config.login;

    return (
      <div className="form__container">
        <form className="login__container" onSubmit={this.handleOnSubmit}>
          <div className="form__group">{this.renderBrand(brand)}</div>
          <div className="form__group">
            <p className="form__name">Sign In</p>
          </div>
          <div className="form__group">{this.renderError(error)}</div>
          <div className="form__group">
            {this.renderInput("username", "Username", form.username)}
          </div>
          <div className="form__group">
            {this.renderPassword(
              "password",
              "Password",
              form.password,
              formExtra.password
            )}
          </div>
          <div className="form__row">
            <div className="form__group">
              {this.renderCheckBox(
                "Remember me",
                "isRemember",
                formExtra.isRemember
              )}
            </div>
            <div className="form__group">
              {this.renderLink("Forgot your password", forgotPasswordUrl)}
            </div>
          </div>
          <div className="form__group">{this.renderBtn("Login")}</div>
          <div className="form__group">{this.renderSocial(socialsNetwork)}</div>
          <div className="form__group">
            {this.renderLink("Register a new account", registerInstead)}
          </div>
        </form>
      </div>
    );
  }
}

export default connect(withRouter(Login));
