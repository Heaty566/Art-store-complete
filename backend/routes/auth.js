const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const router = express.Router();

const { User } = require("../models/user");

router.post("/login", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = await User.findOne({ username: req.body.username });
  if (!user)
    return res.status(404).json({ error: "Invalid username or password" });

  const isCorrectPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isCorrectPassword)
    return res.status(400).json({ error: "Invalid username or password" });

  const token = user.getToken();

  res.send({ msg: "login success", data: token });
});

validateLogin = user => {
  const schema = {
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

  return Joi.validate(user, schema);
};

module.exports = router;
