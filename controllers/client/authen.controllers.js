const Register = require("../../models/register.model")
module.exports.authenPost = async (req, res) => {
  const inFor = await Register.findOne({Email:req.body.Email,Pass:req.body.Pass});

  if(inFor){
    res.cookie("Token",inFor.Token);
    res.redirect("/dashboard");
  }
  else{
  res.redirect("back")
  }
};

