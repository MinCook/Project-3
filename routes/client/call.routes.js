const express = require('express');
const router = express.Router();
const check = require("../../middleware/checkToken")
const controller = require("../../controllers/client/call.controllers")
router.get("/",check.checkToken, controller.index);

module.exports = router;
