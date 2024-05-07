const mongoose = require("mongoose");
const random = require("../public/js/radom");
const registerSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  Pass: String,
  Token: {
    type: String,
    default: random.randomString(20),
  },
});
const Register = mongoose.model("Register", registerSchema, "Register");
module.exports = Register;
