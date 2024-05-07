const Register = require("../../models/register.model")
module.exports.index = async (req, res) => {
  res.render("client/pages/register.pug");
};
module.exports.registerPost = async (req, res) => {
  const exitsEmail = await Register.findOne({Email:req.body.Email})
  console.log(exitsEmail)
  if(exitsEmail) {
    console.log("Đã tồn tại")
    res.redirect("back")
  }
  else{
  await new Register(req.body).save();
  res.redirect("back")
  }
};
