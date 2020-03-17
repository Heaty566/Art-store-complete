const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config.json");
const Joi = require("joi");

const schema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 20,
    minlength: 3,
    trim: true,
    require: true
  },
  email: {
    type: String,
    maxlength: 30,
    trim: true,
    minlength: 3
  },
  username: {
    type: String,
    maxlength: 20,
    trim: true,
    minlength: 3,
    required: true
  },
  password: {
    type: String,
    maxlength: 255,
    trim: true,
    minlength: 8,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true
  },
  avata: {
    type: String
  },
  imagesId: {
    type: Array
  }
});

schema.methods.getToken = function() {
  const obj = {
    _id: this._id,
    isAdmin: this.isAdmin,
    username: this.username
  };

  return jwt.sign(obj, config.jwt.secretKey);
};

const User = mongoose.model("User", schema);

validateUser = user => {
  const schema = {
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
      .required(),
    confirm: Joi.string()
      .max(255)
      .min(8)
      .alphanum()
      .label("Confirm")
      .trim()
      .valid(Joi.ref("password"))
      .required(),
    isAdmin: Joi.boolean(),
    imagesId: Joi.array().items(Joi.string().label("Image"))
  };

  return Joi.validate(user, schema);
};

module.exports.User = User;
module.exports.validate = validateUser;
