const express = require("express");
const _ = require("lodash");
const router = express.Router();

const { Genre, validate } = require("../models/genre");
const { checkId } = require("../utils/checkId");
const { isUser } = require("../middlewares/isUser");
const { isAdmin } = require("../middlewares/isAdmin");

router.get("/all", async (req, res) => {
  const genres = await Genre.find().sort({ name: 1 });
  res.json({ data: genres });
});

router.get("/:id", async (req, res) => {
  const { error } = checkId(req.params.id);
  if (error)
    return res
      .status(404)
      .json({ error: "Genre with the given Id was not found" });

  const genres = await Genre.findById(req.params.id);
  res.json({ data: genres });
});

router.post("/add", [isUser, isAdmin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  if (await Genre.findOne({ name: req.body.name }))
    return res.status(400).json({ error: "Genre has already existed" });

  const genre = new Genre(_.pick(req.body, ["name"]));
  await genre.save();

  res.json({ msg: "create genre successfully", data: genre });
});

router.put("/:id", async (req, res) => {
  const { error } = checkId(req.params.id);
  if (error)
    return res
      .status(404)
      .json({ error: "Genre with the given Id was not found" });

  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res
      .status(404)
      .json({ error: "Genre with the given Id was not found" });

  genre.name = req.body.name;
  await genre.save();
  res.json({ msg: "Update success", data: genre });
});

module.exports = router;
