const Blog = require("../models/blog");
exports.createBlog = async (req, res) => {
  try { 
    const {title , content } = req.body;
    if(!title || !content){
      return res.status(400).json({ message: "Title and content are required" });
    }
    const blog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id   // VERY IMPORTANT
    });

    res.status(201).json({
      message : "Blog created successfully",
      blog
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id })
     .populate("author", "name email")
     .sort({ createdAt : -1 });

    res.status(200).json({
      message : "Blogs fetched successfully",
      blogs
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
