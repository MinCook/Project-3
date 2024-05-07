const express = require('express');
const router = express.Router();

const controller = require("../../controllers/client/authen.controllers")

router.post("/", controller.authenPost);

module.exports = router;
