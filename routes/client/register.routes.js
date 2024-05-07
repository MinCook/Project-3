const express = require('express');
const router = express.Router();

const controller = require("../../controllers/client/register.controllers")
router.get("/", controller.index);
router.post("/", controller.registerPost);

module.exports = router;
