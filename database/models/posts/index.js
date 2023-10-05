const mongoose = require('mongoose');

//schema is the structure of our database

const PostSchema = new mongoose.Schema({
    student_id: {
        type: String,
        required: true,
    },
    student_name: {
        type: String,
        required: true
    },
    title: {
        type: String,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },

    comments:  [
        {
            username: {
                type: String,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
            user_id: {
                type: mongoose.Types.ObjectId,
                ref: "Users"
            },
        }
    ],
},
    {
        timestamps: true
    });


const PostModel = mongoose.model("Posts", PostSchema);
module.exports = PostModel;