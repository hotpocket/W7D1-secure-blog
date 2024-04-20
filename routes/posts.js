const express = require("express");
const router = express.Router();
const PostController = require("../controllers/posts");
const { verifyJWT } = require("../middleware/auth");

// Delegate to controller
router.post('/', verifyJWT, PostController.CreatePost);                 // Create
router.get('/:id', verifyJWT, PostController.GetPostById);              // Read (by id)
router.get('/user/:userId', verifyJWT, PostController.GetPostByUserId); // Read (by user)
router.put('/:id', verifyJWT, PostController.UpdatePost);               // Update
router.delete('/:id', verifyJWT, PostController.DeletePostById);        // Delete

module.exports = router;
