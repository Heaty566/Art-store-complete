const multer = require("multer");
const mkdirp = require("mkdirp");
const config = require("../config.json");
const path = require("path");

fileFilter = (req, file, callback) => {
  const acceptType = [".jpeg", ".jpg", ".png", ".bmp"];

  const mineType = path.extname(file.originalname).toLocaleLowerCase();

  if (acceptType.includes(mineType)) {
    return callback(null, true);
  } else {
    callback("This file must be an image", false);
  }
};

const storageImage = multer.diskStorage({
  destination: function(req, file, callback) {
    const dest = config.multer.url + "/" + req.user._id;
    mkdirp.sync(dest, null);
    callback(null, dest);
  },
  filename: function(req, file, callback) {
    const fileName = file.originalname.split(".")[0];
    callback(
      null,
      fileName + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const storageAvata = multer.diskStorage({
  destination: function(req, file, callback) {
    const dest = config.multer.url + "/" + req.user._id + "/avata";
    mkdirp.sync(dest, null);
    callback(null, dest);
  },
  filename: function(req, file, callback) {
    const fileName = file.originalname.split(".")[0];
    callback(
      null,
      fileName + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

module.exports.uploadImage = multer({
  storage: storageImage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 2 }
});

module.exports.uploadAvata = multer({
  storage: storageAvata,
  fileFilter,
  limits: { fileSize: 1024 * 1024 }
});
