const express = require("express");
const router = express.Router();
const {createBlog , getMyBlogs} = require("../controller/blogController");

const auth = require("../middleware/auth");
const isCreator = require("../middleware/isCreator");

router.post("/create", auth, isCreator, createBlog);
router.get("/my-blogs", auth, isCreator, getMyBlogs);


module.exports = router;