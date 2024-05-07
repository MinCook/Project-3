const mongoose = require("mongoose");
const roomChatSchema = new mongoose.Schema({
  user: [
    {
      user_id: String,
    },
  ],
  deleted: {
    type: Boolean,
    default: false,
  },
});
const RoomChat = mongoose.model("RoomChat", roomChatSchema, "RoomChat");
module.exports = RoomChat;
