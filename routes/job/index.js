const express = require('express');
const UserModel = require('../../database/models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Router = express.Router();
const JWT_SECRET = "yashmita@iac";
const JobModel = require('../../database/models/job');






  Router.get("/getalljobs", async (req, res) => {
    try {
        const jobs = await JobModel.find({});
        jobs.reverse();
        return res.status(200).json({ jobs });
    } catch (error) {
        return res.status(500).send(error);
    }
});

Router.post("/addnewjob", async (req, res) => {
    try {
        const token = req.header('token');
        const data = jwt.verify(token, JWT_SECRET);
        const {title, description, company_name} = req.body;
         console.log(company_name);
        const student_id = data.User.id
        const user = await UserModel.findById(data.User.id)
        const name = user.name;
        // console.log(name);
        const job = await JobModel.create({
            user_name: name,
            user_id: student_id,
            title: title,
            description: description,
            company_name: company_name
        });
        return res.status(200).json({ job });
    } catch (error) {
        return res.status(500).send(error);
    }
});

/**jo jobs hamne post kre hain */

Router.get("/getmyjobs", async (req, res) => {
    try {
      const token = req.header('token');
      const data = jwt.verify(token, JWT_SECRET);
      const student_id = data.User.id;
      const Jobs = await JobModel.find({user_id: student_id});
    //   job.applications?.map((user) => {
    //     if (user === data.User.id) {
    //       ifAlreadyExists = true;
    //     } 
    //   })
      return res.status(200).json({ jobs });
    } catch (error) {
      return res.status(500).send(error);
    }
  });

  Router.get("/getjob/:job_id", async (req, res) => {
    try {
        const { job_id } = req.params;
        console.log(job_id);
        const job = await JobModel.findById(job_id);
        console.log(job);
        return res.status(200).json(job);
    } catch (error) {
        return res.status(500).send(error);
    }
});

Router.get("/getmyapplications", async (req, res) => {
    try {
      const token = req.header('token');
      const data = jwt.verify(token, JWT_SECRET);
      const student_id = data.User.id;
    //   let job = await JobModel.findById(req.params.job_id)
      const jobs = await JobModel.find({});
      my_jobs=[];
      jobs?.map((job)=>{
        job.applications?.map((user) => {
            if (user_id === data.User.id) {
                my_jobs.push(job._id)
           }
        })
      })
      console.log(my_jobs);
      return res.status(200).json({ jobs });
    } catch (error) {
      return res.status(500).send(error);
    }
  });




  module.exports = Router;