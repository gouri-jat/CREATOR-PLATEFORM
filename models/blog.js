const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true  , trim : true , maxlength : 100},
    content: { type: String, required: true , trim : true},
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim : true,
      index : true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
