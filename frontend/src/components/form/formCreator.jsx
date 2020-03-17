import React, { Component } from "react";
import Joi from "joi";
import "./formCreator.scss";

import FormBtn from "./common/formBtn";
import FormLink from "./common/formLink";
import FormPassword from "./common/formPassword";
import FormInput from "./common/formInput";
import FormSocial from "./common/formSocial";
import FormError from "./common/formError";
import FormBrand from "./common/formBrand";
import FormFile from "./common/formFile";
import FormCheckBox from "./common/formCheckBox";
import FormSelectList from "./common/formSelectList";
import FromTextArea from "./common/formTextArea";
import FormBtnFunction from "./common/formBtnFunction";

class FormCreator extends Component {
  state = {
    form: {},
    formExtra: {}
  };

  validateForm = () => {
    const { form } = this.state;
    const { error } = Joi.validate(form, this.schema);

    return error ? error.details[0].message : "";
  };

  handleOnSubmit = event => {
    event.preventDefault();

    const errors = this.validateForm();
    if (errors) this.setState({ error: errors });

    this.submitForm();
  };

  handleOnChangeInput = ({ currentTarget: input }) => {
    const { form } = this.state;
    form[input.name] = input.value;

    this.setState({ form });
  };

  renderInput = (name, label, value, type = "text") => {
    return (
      <FormInput
        onChange={this.handleOnChangeInput}
        name={name}
        label={label}
        value={value}
        type={type}
      />
    );
  };

  //--------------------------------------------------------

  handleOnSeePassword = name => {
    const { formExtra } = this.state;
    formExtra[name] = !formExtra[name];

    this.setState({ formExtra });
  };

  renderPassword = (name, label, value, isSee) => {
    return (
      <FormPassword
        name={name}
        label={label}
        value={value}
        isSee={isSee}
        onChange={this.handleOnChangeInput}
        onSeePassword={this.handleOnSeePassword}
      />
    );
  };

  //--------------------------------------------------------

  handleOnClickCheckBox = ({ currentTarget: input }) => {
    const { formExtra } = this.state;
    formExtra[input.name] = !formExtra[input.name];

    this.setState({ formExtra });
  };

  renderCheckBox = (label, name, value) => {
    return (
      <FormCheckBox
        label={label}
        name={name}
        value={value}
        onClick={this.handleOnClickCheckBox}
      />
    );
  };

  //--------------------------------------------------------

  handleOnSelectList = ({ currentTarget: input }) => {
    const { form } = this.state;
    form[input.name] = input.value;

    this.setState({ form });
  };

  renderSelectList = (data, name, selected) => {
    return (
      <FormSelectList
        data={data}
        onChange={this.handleOnSelectList}
        name={name}
        selected={selected}
      />
    );
  };

  //--------------------------------------------------------

  handleOnChangeTextArea = ({ currentTarget: input }) => {
    const { form } = this.state;
    form[input.name] = input.value;

    this.setState({ form });
  };

  renderTextArea = (name, label, value, limits) => {
    return (
      <FromTextArea
        name={name}
        value={value}
        limits={limits}
        label={label}
        onChange={this.handleOnChangeTextArea}
      />
    );
  };

  //--------------------------------------------------------

  handleOnSelectFile = ({ currentTarget: input }) => {
    const { form } = this.state;
    if (input.files[0]) {
      const reader = new FileReader();
      reader.onload = function() {
        var dataURL = reader.result;
        var output = document.getElementById("main-image");
        output.src = dataURL;
      };
      reader.readAsDataURL(input.files[0]);
      form.image = input.files[0];
    }

    this.setState({ form });
  };

  renderSelectFile = (data, label, name) => {
    return (
      <FormFile
        data={data}
        name={name}
        label={label}
        onChange={this.handleOnSelectFile}
      />
    );
  };

  //--------------------------------------------------------

  renderError = label => {
    return <FormError label={label} />;
  };

  //--------------------------------------------------------
  renderBrand = data => {
    return <FormBrand data={data} />;
  };

  //--------------------------------------------------------

  renderBtn = (label, type = "submit") => {
    return <FormBtn label={label} type={type} />;
  };

  //--------------------------------------------------------

  renderSocial = dataSocials => {
    return <FormSocial data={dataSocials} />;
  };

  //--------------------------------------------------------

  renderBtnFunction = (label, func) => {
    return <FormBtnFunction label={label} onClick={func} />;
  };

  //--------------------------------------------------------

  renderLink = (label, url) => {
    return <FormLink label={label} url={url} />;
  };
}

export default FormCreator;
