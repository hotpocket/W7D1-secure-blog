const { postModel } = require("../models/post");

// Class definition for the PostController
class PostController {
  // Method for creating a new post
  static async CreatePost(req, res, next) {
    try {
      const { title, description } = req.body;
      console.log("BODY", req.body);
      console.log(title,description)
      console.log("USER", req.user);
      if (!title || !description)
        return res.status(400).json("Please provide title and description");
      const post = await postModel.create({ title, userId: req.user.id, description });
      post.save();
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }

  // Method for deleting a post by its ID
  static async DeletePostById(req, res, next) {
    try {
      const postId = req.params.id;
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async UpdatePost(req, res, next) {
    try {
      const postId = req.params.id;
      // Implement update logic here
      res.status(200).json({ message: "Post updated successfully" });
    } catch (error) {
      // Logging the error and passing it to the error handling middleware
      console.log(error);
      next(error);
    }
  }

  // Method for getting a post by its ID
  static async GetPostById(req, res, next) {
    Post.findById(req.params.id)
      .then((err, post) => {
        // const setStatus = (code, msg) => res.status(code).json({message: msg})
        if(err)   return res.status(500).json({message:"Server error"});
        if(!post) return res.status(404).json({message:"Post not found"});
        res.status(200).json(post);
      })
      .catch((err) => {
        console.log("Error looking up Post by id: ", err);
        // res.status(500).json({message:"Server error"});
      });
  }

  // Method for getting posts by a user's ID
  static async GetPostByUserId(req, res, next) {
    try {
      // Extracting the user ID from the request parameters
      const userId = req.params.userId;

      // Implement retrieval logic here

      // Sending a success response with the retrieved posts
      res.status(200).json({ message: "Retrieved posts by user ID" });
    } catch (error) {
      // Logging the error and passing it to the error handling middleware
      console.log(error);
      next(error);
    }
  }
}

// Exporting the PostController class to be used by other modules
module.exports = PostController;
