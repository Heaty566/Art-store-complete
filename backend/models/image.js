const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 30,
    minlength: 1,
    required: true
  },
  authorId: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    max: 10000,
    min: 0,
    default: 0
  },
  url: {
    type: String,
    required: true
  },
  genreId: {
    type: String,
    required: true
  },

  status: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    maxlength: 400,
    minlength: 0,
    default: ""
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const Image = mongoose.model("Image", schema);

validateImage = image => {
  const schema = {
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
    status: Joi.boolean(),
    description: Joi.string()
      .max(400)
      .min(0)
      .label("Description")
  };

  return Joi.validate(image, schema);
};

module.exports.Image = Image;
module.exports.validate = validateImage;
