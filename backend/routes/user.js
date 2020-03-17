const express = require("express");
const _ = require("lodash");
const config = require("../config.json");
const bcrypt = require("bcrypt");
const { checkId } = require("../utils/checkId");
const Joi = require("joi");
const router = express.Router();

const { User, validate } = require("../models/user");
const { isUser } = require("../middlewares/isUser");

router.get("/me", [isUser], async (req, res) => {
  const { error } = checkId(req.user._id);
  if (error) return res.status(400).json({ error: "Invalid user" });

  const user = await User.findById(req.user._id);
  if (!user) return res.status(400).json({ error: "Invalid user" });

  res.json({ data: _.pick(user, ["name", "username", "email", "_id"]) });
});

router.get("/:id", async (req, res) => {
  const { error } = checkId(req.params.id);
  if (error) return res.status(400).json({ error: "Invalid user" });

  const user = await User.findById(req.params.id);
  if (!user) return res.status(400).json({ error: "Invalid user" });

  res.json({ data: _.pick(user, ["name"]) });
});

router.post("/register", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  const user = new User(_.pick(req.body, ["name", "username", "email"]));
  const isUnique = await User.find({ username: user.username });

  if (isUnique.length)
    return res.status(400).json({ error: `"Username" has been taken.` });

  if (req.body.password === req.body.confirm) {
    const salt = await bcrypt.genSalt(config.bcrypt.rounds);
    user.password = await bcrypt.hash(req.body.password, salt);
  } else
    return res.status(400).json({ error: "Confirm doesn't match password." });

  await user.save();

  const token = user.getToken();

  res.send({ msg: "login success", data: token });
});

router.put("/update", [isUser], async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = await User.findById(req.user._id);
  if (!user) return res.status(400).json({ error: "Invalid username" });

  user.name = req.body.name;
  user.email = req.body.email;

  if (req.body.password && req.body.confirm) {
    if (req.body.password === req.body.confirm) {
      const salt = await bcrypt.genSalt(config.bcrypt.rounds);
      user.password = await bcrypt.hash(req.body.password, salt);
    } else {
      return res.status(400).json({ error: "Confirm doesn't match password." });
    }
  }
  await user.save();
  res.json({
    msg: "update success",
    data: _.pick(user, ["name", "username", "email"])
  });
});

validateUpdateUser = user => {
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
    password: Joi.string()
      .max(255)
      .min(8)
      .alphanum()
      .allow("")
      .label("Password")
      .trim(),
    confirm: Joi.string()
      .max(255)
      .min(8)
      .allow("")
      .alphanum()
      .label("Confirm")
      .trim()
  };

  return Joi.validate(user, schema);
};

module.exports = router;
