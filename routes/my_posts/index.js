const express = require('express');

const Router = express.Router();
const jwt = require("jsonwebtoken");
const PostModel = require('../../database/models/posts');
const UserModel = require('../../database/models/user');
const JWT_SECRET = "yashmita@iac";


Router.get("/getallposts", async (req, res) => {
    try {
        const posts = await PostModel.find({});
        posts.reverse();
        return res.status(200).json({ posts });
    } catch (error) {
        return res.status(500).send(error);
    }
});


Router.post("/addnewpost", async (req, res) => {
    try {
        const token = req.header('token');
        const data = jwt.verify(token, JWT_SECRET);
        const { name, title, description, image } = req.body.credentials;
        const student_id = data.User.id
        console.log(image);
        const post = await PostModel.create({
            student_name: name,
            student_id: student_id,
            title: title,
            image: image,
            description: description
        });
        return res.status(200).json({ post });
    } catch (error) {
        return res.status(500).send(error);
    }
});

Router.put("/addcomments/:post_id", async (req, res) => {
    try {
        const token = req.header('token');
        const data = jwt.verify(token, JWT_SECRET);
        const { comment } = req.body;
        const student_id = data.User.id
        const user = await UserModel.findById(student_id);
        const { post_id } = req.params
        const obj = {
            username: user.name,
            user_id: student_id,
            comment: comment
        }
        // const user = await PostModel.fi
        post = await PostModel.findByIdAndUpdate(post_id, {
            $push: { comments: obj }
        }, {
            new: true
        });
        console.log(post);
        return res.status(200).json({ post });
    } catch (error) {
        return res.status(500).send(error);
    }
});

Router.get("/getpost/:post_id", async (req, res) => {
    try {
        const { post_id } = req.params;
        console.log(post_id);
        const post = await PostModel.findById(post_id);
        console.log(post);
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).send(error);
    }
});


module.exports = Router;