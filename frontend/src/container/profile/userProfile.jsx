import React from "react";
import Joi from "joi";

import { connect } from "../../stores/connect/global";
import FromCreator from "../../components/form/formCreator";
import { getMe, updateUser } from "../../service/userService";
import { toUpperCase } from "../../utils/toUpperCase";

class UserProfile extends FromCreator {
  state = {
    form: {
      name: "",
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

  async componentDidMount() {
    const { user } = this.props;
    if (user.token) {
      const result = await getMe(user.token);

      if (result.error) {
        this.setState({ error: result.error });
      } else {
        const { form } = this.state;
        form.name = result.data.name;
        form.email = result.data.email;

        this.setState({ form });
      }
    }
  }

  async componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (user.token && !prevProps.user.token) {
      const result = await getMe(user.token);

      if (result.error) {
        this.setState({ error: result.error });
      } else {
        const { form } = this.state;
        form.name = result.data.name;
        form.email = result.data.email;

        this.setState({ form, error: "" });
      }
    }
  }

  schema = {
    name: Joi.string()
      .max(20)
      .min(3)
      .trim()
      .label("Full Name")
      .required(),
    email: Joi.string()
      .max(30)
      .min(3)
      .trim()
      .label("Email")
      .email()
      .required(),
    password: Joi.allow(""),
    confirm: Joi.allow("")
  };

  submitForm = async () => {
    const { user } = this.props;
    const { form } = this.state;
    const result = await updateUser(form, user.token);

    if (result.error) {
      this.setState({ error: result.error });
    } else {
      window.location.reload();
    }
  };

  render() {
    const { form, error, formExtra } = this.state;
    const { user } = this.props;
    const newUsername = toUpperCase(user.user.username);

    return (
      <React.Fragment>
        <div className="avata__container">
          <img src="/page/avataDefault.jpg" alt="test" />
        </div>
        <form className="userProfile__container" onSubmit={this.handleOnSubmit}>
          <div className="form__container">
            <div className="form__group">
              <p className="form__name">{`${newUsername}'s profile`}</p>
            </div>
            {error ? (
              <div className="form__group">{this.renderError(error)}</div>
            ) : null}
            <div className="form__group">
              {this.renderInput("name", "Name", form.name)}
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
            <div className="form__group">{this.renderBtn("Update")}</div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default connect(UserProfile);
