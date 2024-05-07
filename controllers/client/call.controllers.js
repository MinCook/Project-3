
const Chat = require("../../models/chat.model");
const Register = require("../../models/register.model");
module.exports.index = async (req, res) => {
  const User = res.locals.User.id;
  const Name = res.locals.User.Name;
  _io.once("connection", (socket) => {
    socket.on("CLIENT_SEND_MESSAGE", async (chatContent) => {
      const chat = new Chat({
        user_id: User,
        content: chatContent,
      });
      await chat.save();
      socket.emit("SEVER_RETURN_MESSAGE", {
        user:User,
        name: Name,
        content: chatContent,
      });

    });
  });

  const contentChat = await Chat.find({
    deleted: false,
  });
  for (const chat of contentChat) {
    const inforUser = await Register.findOne({ _id: chat.user_id });
    chat.User = inforUser;
  }
  res.render("client/pages/meettingRoom.pug", {
    content: contentChat,
  });
};
