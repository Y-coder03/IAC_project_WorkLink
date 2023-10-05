const db = require("./database/connection/index");

const express = require("express");
const cors = require("cors")
const auth = require("./routes/auth")
const user = require("./routes/user")
const job = require("./routes/job")
const posts = require("./routes/my_posts")

const app = express();
app.use(express.json());
app.use(cors());
db();

app.get("/", (req,res)=>{
    res.send("hello world");
})

//services/api
app.use("/auth", auth);
app.use("/user", user);
app.use("/posts", posts);
app.use("/job", job);

const port = 10000;
app.listen(port, ()=>{
    console.log(`app listening at port http://localhost:${port}`);
})