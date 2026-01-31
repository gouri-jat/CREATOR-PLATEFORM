const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {becomeCreator} = require("../controller/creatorController");

router.post("/become",auth,becomeCreator);


module.exports = router;