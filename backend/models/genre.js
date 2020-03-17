const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 10,
    min: 1,
    required: true
  }
});

const Genre = mongoose.model("Genre", schema);

const validateGenre = genre => {
  const schema = {
    name: Joi.string()
      .trim()
      .min(1)
      .max(10)
      .required()
  };

  return Joi.validate(genre, schema);
};

module.exports.Genre = Genre;
module.exports.validate = validateGenre;
