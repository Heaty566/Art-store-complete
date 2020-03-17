const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports.checkId = id => {
  const schema = {
    id: Joi.objectId()
  };

  return Joi.validate({ id }, schema);
};
