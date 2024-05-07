const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
global._io=io;
// const conn = peer.connect('another-peers-id');
// global._conn = conn;
require("dotenv").config();
const port = process.env.PORT;

app.set("views","./views");
app.set("view engine", "pug");
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

const route = require("./routes/client/index.routes");
route(app);

const database = require("./config/db.js");
database.connect();


server.listen(port, () => {
  console.log("đã kết nối port  " + port);
});














