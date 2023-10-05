const mongoose = require('mongoose');

//schema is the structure of our database

const UserSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true,
    },
    phone:
    {
        type: Number,
        default: null,
    },
    email:
    {
        type: String,
        required: true,
    },
    about:
    {
        type: String,
        // required: true,
    },
    status:
    {
        type: String,
        required: true,
    },
    password:
    {
        type: String,
        required: true,
    },
    city:
    {
        type: String
    },
    headline:
    {
        type: String
    },
    resume: 
    {
        type: String,
    },
    skills:
    {
        type: Array
    },
    class_10_education: [
        {
            school_name: {
                type: String,
                required: true,
            },
            marks: {
                type: String,
                required: true,
            },
            passing_year: {
                type: Number,
                required: true,
            },
        }
    ],
    class_12_education: [
        {
            school_name: {
                type: String,
                required: true,
            },
            marks: {
                type: String,
                required: true,
            },
            passing_year: {
                type: Number,
                required: true,
            },
        }
    ],
    latest_degree: [
        {
            institute_name: {
                type: String,
                required: true,
            },
            marks: {
                type: Number,
                required: true,
            },
            passing_year: {
                type: Number,
                required: true,
            },
            stream: {
                type: String,
                required: true,
            },
        }
    ],
    experience: [
        {
            company: {
                type: String,
                required: true,
            },
            timeline: {
                type: String,
                required: true,
            },
            position: {
                type: String,
                required: true,
            },
            location: {
                type: String
            },
            description: {
                type: String,
            },
        }
    ],
    projects: [
        {
            title: {
                type: String,
            },
            description: {
                type: String,
            },
            link: {
                type: String,
            },
        }
    ],
},
    {
        timestamps: true
    });


const UserModel = mongoose.model("Users", UserSchema);
module.exports = UserModel;