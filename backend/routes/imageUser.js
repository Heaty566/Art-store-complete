const express = require("express");
const router = express.Router();
const _ = require("lodash");

const { checkId } = require("../utils/checkId");
const { isUser } = require("../middlewares/isUser");
const { uploadAvata, uploadImage } = require("../middlewares/uploadImage");
const { User } = require("../models/user");
const { Genre } = require("../models/genre");
const { Image, validate } = require("../models/image");

router.get("/all", [isUser], async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(400).json({ error: "Invalid user" });
  const images = [];
  for (let item of user.imagesId) {
    images.push(await Image.findById(item));
  }

  res.json({ msg: "get image successfully", data: images });
});

router.post(
  "/addAvata",
  [isUser, uploadAvata.single("avata")],
  async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).json({ error: "Invalid user" });

    user.avata = req.file.filename;

    await user.save();
    res.json({ msg: "Update avata" });
  }
);

router.post("/add", [isUser, uploadImage.single("image")], async (req, res) => {
  if (req.file.size > 1024 * 1024 * 2) {
    return res
      .status(400)
      .json({ error: "This file must be smaller than 2mb" });
  }

  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { error: error2 } = checkId(req.body.genreId);
  if (error2) return res.status(400).json({ error: "Invalid genreId" });

  const { error: error3 } = checkId(req.user._id);
  if (error3) return res.status(400).json({ error: "Invalid User" });

  if (!(await Genre.findById(req.body.genreId)))
    return res
      .status(400)
      .json({ error: "Genre with the given Id was not found" });

  const user = await User.findById(req.user._id);
  if (!user) return res.status(400).json({ error: "Invalid user" });

  const image = new Image(_.pick(req.body, ["title", "price"]));
  user.imagesId.push(image._id);

  image.authorId = user._id;
  image.genreId = req.body.genreId;
  image.url = req.file.filename;
  if (req.body.status) image.status = req.body.status;
  if (req.body.description) image.description = req.body.description;

  await user.save();
  await image.save();

  res.json({ msg: "Add image successfully", data: image });
});

router.put("/:id", [isUser], async (req, res) => {
  const { error } = checkId(req.params.id);
  if (error) return res.status(400).json({ error: "Invalid Image" });

  const { error: error2 } = validate(req.body);
  if (error2) return res.status(400).json({ error: error2.details[0].message });

  const user = await User.findById(req.user._id);
  if (!user) return res.status(400).json({ error: "Invalid User" });

  const isOwner = user.imagesId.includes(req.params.id);
  if (!isOwner) return res.status(403).json({ error: "Forbidden" });

  const image = await Image.findById(req.params.id);
  if (!image) return res.status(404).json({ error: "Invalid image" });

  image.title = req.body.title;
  image.price = req.body.price;
  image.genreId = req.body.genreId;
  image.status = req.body.status;
  image.description = req.body.description;

  await image.save();

  res.json({ msg: "update image successfully", data: image });
});

router.delete("/:id", [isUser], async (req, res) => {
  const { error } = checkId(req.params.id);
  if (error) return res.status(400).json({ error: "Invalid Image" });

  const user = await User.findById(req.user._id);
  if (!user) return res.status(400).json({ error: "Invalid User" });

  const isOwner = user.imagesId.includes(req.params.id);
  if (!isOwner) return res.status(403).json({ error: "Forbidden" });

  user.imagesId = user.imagesId.filter(item => String(item) !== req.params.id);

  const image = await Image.findByIdAndDelete(req.params.id);
  if (!image)
    return res
      .status(404)
      .json({ error: "Image with the given Id was not found" });

  await user.save();
  res.json({ msg: "delete image successfully" });
});

module.exports = router;
