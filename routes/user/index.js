const express = require('express');
const UserModel = require('../../database/models/user');
// const bcrypt = require('bcryptjs');
const Router = express.Router();
const jwt = require("jsonwebtoken");
const PostModel = require('../../database/models/posts');
const mongoose = require("mongoose");
const JobModel = require('../../database/models/job');
const JWT_SECRET = "yashmita@iac";

/* 
Route     /allusers
descrip   getting all users
params    none
access    public
method    get
*/

Router.get("/profile", async (req, res) => {
  try {
    const token = req.header('token');
    const data = jwt.verify(token, JWT_SECRET);
    const user = await UserModel.findById(data.User.id);
    if (!user) {
      return res.status(500).json({ error: 'User does not exists' });
    }

    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})


/* 
Route     /getmyjobs/:userId
descrip   getting my jobs
params    user id
access    public
method    get
*/

Router.get("/getmyposts", async (req, res) => {
  try {
    const token = req.header('token');
    const data = jwt.verify(token, JWT_SECRET);
    const student_id = data.User.id;
    const posts = await PostModel.find({ student_id });
    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).send(error);
  }
});


/* 
Route     /addnewuser
descrip   adding details of a new user
params    none
access    public
method    post
*/

Router.put("/addnewuser", async (req, res) => {
  try {
    // const { email,id } = req.body;
    // console.log(req.params.id);
    // let user = await UserModel.findOne({email});
    // let update = {$set: req.body}
    // if (!user) {
    //   return res.status(500).json({ error: 'User does not exists' });
    // }
    // let user = await UserModel.findByIdAndUpdate(req.params.id, update, {new: true})
    // console.log(user)


    // const token = req.header('token');
    // const data = jwt.verify(token, JWT_SECRET);
    console.log(req.body.credentials);
    const { email } = req.body.credentials;
    let user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(500).json({ error: 'User does not exists' });
    }
    user = await UserModel.findOneAndUpdate({ email }, {
      $set: { new: req.body.credentials }
    })

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).send(error);
  }
});


Router.get("/getusername", async (req, res) => {
  try {
    const token = req.header('token');
    const data = jwt.verify(token, JWT_SECRET);
    const user = await UserModel.findById(data.User.id);
    if (!user) {
      return res.status(500).json({ error: 'User does not exists' });
    }

    return res.status(200).json(user.name);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

/*
Route     /search/:keyword
descrip   searching intern by keywords
params    none
access    public
method    post
*/

Router.get("/search/:name", async (req, res) => {
  try {
    console.log(req.params);
    const users = await UserModel.find({});
    const result = users.filter((user) => {
      return user.name.includes(req.params.name)
    })
    // console.log(result);
    return res.status(200).json(result);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

/* 
Route     /jobapply/:internId
descrip   applying for job
params    user id, intern id
access    public
method    post
*/

Router.post("/jobapply/:job_id", async (req, res) => {
  try {
    const token = req.header('token');
    const data = jwt.verify(token, JWT_SECRET);

    let job = await JobModel.findById(req.params.job_id)
    let ifAlreadyExists = false;
    job.applications?.map((user) => {
      if (user === data.User.id) {
        ifAlreadyExists = true;
      }
    })
    if (ifAlreadyExists) {
      return res.status(400).json({ error: "You have already applied for this." })
    }
    job = await JobModel.findByIdAndUpdate(req.params.job_id,
      {
        $push: {
          applications: [{
            user_id: data.User.id,
          }]
        }
      }, {
      new: true
    });

    return res.status(200).send("You have successfully applied for the opportunity");

  } catch (error) {
    return res.status(500).json({ error: error.message } || { error: "Some error occured while applying for the intern" });
  }
});





/* 
Route     /edituser
descrip   editing user details with user id
params    none
access    public
method    put
*/

// Router.put("/edituser", async (req, res) => {
//   try {
//     // const token = req.header('token');
//     // const data = jwt.verify(token, "sudhir$%%Agrawal");
//     const data=req.data;
//     let user = await UserModel.findById(data.User.email);
//     if (!user) {
//       return res.status(500).json({ error: 'User does not exists' });
//     }
//     user = await UserModel.findByIdAndUpdate(data.User.id, {
//       $set: req.body.credentials
//     })
//     return res.status(200).json(user);

//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// })

// /* 
// Route     /jobapply/:internId
// descrip   applying for job
// params    user id, intern id
// access    public
// method    post
// */

// Router.post("/jobapply/:internId", async (req, res) => {
//   try {
//     const token = req.header('token');
//     const data = jwt.verify(token, "sudhir$%%Agrawal");

//     let intern = await InternModel.findById(req.params.internId)
//     let ifAlreadyExists = false;
//     intern.usersApplied?.map((user) => {
//       if (user === data.User.id) {
//         ifAlreadyExists = true;
//       }
//     })
//     if (ifAlreadyExists) {
//       return res.status(400).json({ error: "You have already applied for this." })
//     }
//     //finding resume id
//     let resume = await ResumeModel.find({ user: data.User.id });
//     resume = resume.filter((data) => {
//       return data.resumeTitle == req.body.credentials.resume
//     })
//     if (resume.length === 0) {
//       return res.status(500).json({ error: "resume not selected" });
//     }
//     // pushing intern in intern model
//     intern = await InternModel.findOneAndUpdate({
//       _id: req.params.internId
//     }, {
//       $push: { usersApplied: data.User.id }
//     }, {
//       new: true
//     });
//     const user = await UserModel.findOneAndUpdate({
//       _id: data.User.id
//     }, {
//       $push: {
//         internsApplied: [{
//           id: req.params.internId,
//           date: new Date(),
//           resume: resume[0]._id.toString(),
//           question: req.body.credentials.question
//         }]
//       }
//     }, {
//       new: true
//     });
//     return res.status(200).send("You have successfully applied for the opportunity");

//   } catch (error) {
//     return res.status(500).json({ error: error.message } || { error: "Some error occured while applying for the intern" });
//   }
// });


module.exports = Router;