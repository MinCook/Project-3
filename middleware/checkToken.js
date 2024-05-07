const Register = require("../models/register.model");

module.exports.checkToken = async (req, res, next) => {
  if (!req.cookies.Token) {
    res.redirect("/");
  } else {
    res.locals.User = await Register.findOne({ Token: req.cookies.Token})
      next();
  }
};
