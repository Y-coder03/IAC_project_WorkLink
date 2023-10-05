const mongoose = require('mongoose');

//schema is the structure of our database

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    company_name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

    user_id: {
        type: mongoose.Types.ObjectId,
        ref: "Users"
    },
    user_name: {
        type: String, 
        required: true
    },

    applications:  [
        {
            user_id: {
                type: mongoose.Types.ObjectId,
                ref: "Users"
            },
            user_name: {
                type: String, 
                // required: true
            }
        }
    ],
},
    {
        timestamps: true
    });


const JobModel = mongoose.model("Jobs", JobSchema);
module.exports = JobModel;