const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {becomeCreator} = require("../controller/creatorController");

router.patch("/become-creator",auth,becomeCreator);


module.exports = router;