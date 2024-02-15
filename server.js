import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import pg from "pg";

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get("/", (req,res)=>{
    res.render("index.ejs");

})
app.get("/signup_user", (req,res)=>{
    res.render("user_signup.ejs")
})
app.get("/login_user", (req,res)=>{
    res.render("user_signup.ejs")
})
app.get("/signup_driver", (req,res)=>{
    res.render("user_signup.ejs")
})
app.get("/login_driver", (req,res)=>{
    res.render("user_signup.ejs")
})
app.get("/signup_vol", (req,res)=>{
    res.render("user_signup.ejs")
})
app.get("/login_vol", (req,res)=>{
    res.render("user_signup.ejs")
})


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})