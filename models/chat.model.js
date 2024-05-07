const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
  user_id: String,
  content: String,
  deleted: {
    type: Boolean,
    default: false,
  },
});
const Chat = mongoose.model("Chat", chatSchema, "Chat");
module.exports = Chat;
