module.exports.isAdmin = (req, res, next) => {
  req.user.isAdmin ? next() : res.status(403).json({ error: "Forbidden" });
};
