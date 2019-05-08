const Joi = require("joi");
const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {
  addPost(req, res) {
    const Schema = Joi.object().keys({
      post: Joi.string().required()
    });
    const body = {
      post: req.body.post
    };
    const { error } = Joi.validate(body, Schema);
    if (error && error.details) {
      return res.status(400).json({
        msg: error.details
      });
    }
    const bodyObj = {
      user: req.user._id,
      username: req.user.username,
      post: req.body.post,
      created: new Date()
    };

    Post.create(bodyObj)
      .then(async post => {
        await User.updateOne(
          {
            _id: req.user._id
          },
          {
            $push: {
              posts: {
                postId: post._id,
                post: req.body.post,
                created: new Date()
              }
            }
          }
        );
        res.status(200).json({
          message: "Post created",
          post
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Error occured"
        });
      });
  },

  async GetAllPosts(req, res) {
    try {
      const posts = await Post.find({})
        .populate("user")
        .sort({
          created: -1
        });

      return res.status(200).json({
        message: "All posts",
        posts
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error occured"
      });
    }
  },

  EditPost(req, res) {
    const Schema = Joi.object().keys({
      post: Joi.string().required(),
      id: Joi.string().optional()
    });
    const { error } = Joi.validate(req.body, Schema);
    if (error && error.details) {
      return res.status(400).json({
        msg: error.details
      });
    }
    const body = {
      post: req.body.post,
      created: new Date()
    };

    Post.findOneAndUpdate({ _id: req.body.id }, body, { new: true })
      .then(post => {
        res
          .status(200)
          .json({ message: "Post updated successfully", post });
      })
      .catch(err => {
        return res.status(500).json({
          message: err
        });
      });
  },
  async GetPost(req, res) {
    await Post.findOne({
      _id: req.params.id
    })
      .populate("user")
      .then(post => {
        res.status(200).json({
          message: "Post found ",
          post
        });
      })
      .catch(err =>
        res.status(400).json({
          message: "Post not found ",
          post
        })
      );
  },

  async DeletePost(req, res) {
    try {
      const { id } = req.params;
      const result = await Post.findByIdAndRemove(id);
      
      if(!result) {
        return res.status(400).json({message: 'could not delete post'})
      } else {
        await User.updateOne({
          _id: req.user._id
        }, {
          $pull: {posts: {
            postId: result._id
          }}
        });
        return res.status(200).json({ message: 'post succesfully deleted' })
      }
    } catch (err) {
      return res.status(500).json({
        message: err
      });
    }
  }
};