const express = require("express");
const router = express.Router();

const { Image } = require("../models/image");
const { Genre } = require("../models/genre");
const { checkId } = require("../utils/checkId");

router.get("/all", async (req, res) => {
  const images = await Image.find().sort({ title: 1 });

  res.json({ data: images });
});

router.get("/genreId/:id", async (req, res) => {
  const { error } = checkId(req.params.id);
  if (error) return res.status(400).json({ error: "Invalid Genre" });

  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).json({ error: "Invalid Genre" });

  const images = await Image.find({ genreId: req.params.id });

  res.json({ data: images });
});

router.get("/:id", async (req, res) => {
  const { error } = checkId(req.params.id);
  if (error) return res.status(400).json({ error: "Invalid image" });

  const image = await Image.findById(req.params.id);
  if (!image)
    return res
      .status(404)
      .json({ error: "The image with the given Id was not found" });

  res.json({ data: image });
});

router.post("/search", async (req, res) => {
  const { error } = checkId(req.body.search);
  if (error) {
    const images = await Image.find().sort({ title: 1 });
    const filter = images.filter(item =>
      item.title.toLowerCase().includes(req.body.search.toLowerCase())
    );
    res.json({ data: filter });
  } else {
    const image = await Image.findById(req.body.search);
    console.log(image);
    if (!image)
      return res
        .status(404)
        .json({ error: "The image with the given Id was not found" });

    res.json({ data: [image] });
  }
});

module.exports = router;
