const express = require('express');
const UserModel = require('../../database/models/user');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const Router = express.Router();
const JWT_SECRET = "yashmita@iac";

// const JWT_SECRET = 'sudhir$%%Agrawal'

/* 
Route     /signup
descrip   signup
params    none
access    public
method    post
*/

Router.post("/signup", async (req, res) => {
  try {
    // await ValidateSignup(req.body.credentials);
    console.log(req.body);
    const { name, email, password, status, phone } = req.body;
    let ifAlreadyExists = null;

    ifAlreadyExists = await UserModel.findOne({ email: email });

    if (ifAlreadyExists) {
      return res.status(500).json({ error: `user with this email already exists` });
    }

    //generating salt
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    //creating new user 
    const user = await UserModel.create({
      name: name,
      email: email,
      password: secPass,
      status: status,
      phone: phone
    });

    // creating user data token 
    const data = {
      User: {
        id: user.id
      }
    }

    //JWT AUth Token
    const token = JWT.sign(data, JWT_SECRET, { expiresIn: "30d" });

    return res.status(200).json({ token: token, details: user });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

/* 
Route     /signin
descrip   signin with email and password
params    none
access    public
method    post
*/

Router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req);
    let user = [];

    user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ error: "Enter correct credentials" })
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({ error: "Password is incorrect" })
    }
    let data = {};

    data = {
      User: {
        id: user.id,
      }
    }
    const token = JWT.sign(data, JWT_SECRET, { expiresIn: "30d" });
    return res.status(200).json({ token: token, details: user });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

/* 
Route     /signin/google
descrip   signin with google account
params    none
access    public
method    post
*/

Router.post("/signin/google", async (req, res) => {
  try {
    const { email, password, name, status } = req.body
    let user = [];

    user = await UserModel.findOne({ email: email });

    if (!user) {
      //generating salt
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);

      //creating new user 
      const user = await UserModel.create({
        name: name,
        email: email,
        password: secPass,
        status: status,
      });

      // creating user data token 
      const data = { 
        User: {
          id: user.id
        }
      }

      //JWT AUth Token
      const token = JWT.sign(data, JWT_SECRET, { expiresIn: "30d" });
      return res.status(200).json({ token: token, details: user });
    }

    let data = {};

    data = {
      User: {
        id: user.id,
      }
    }
    const token = JWT.sign(data, JWT_SECRET, { expiresIn: "30d" });
    return res.status(200).json({ token: token, details: user });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

// // Endpoint to sign out (invalidate token)
// app.post('/api/signout', verifyToken, (req, res) => {
//   const token = req.headers.authorization;

//   // Remove the token from the array (simulate invalidating the token)
//   const index = tokens.indexOf(token);
//   if (index !== -1) {
//     tokens.splice(index, 1);
//   }

//   res.json({ message: 'Signed out successfully' });
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

module.exports = Router;