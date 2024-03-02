import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
import env from "dotenv";
import GoogleStrategy from "passport-google-oauth2" //google auth

import connectDB from './public/js/db.js'

import User from './public/js/user.js';

connectDB();

//create new user code

// const createUser = async () => {
//   try {
//       const newUser = new User({
          
//           email: 'john@example.com',
//           password: 'password123'
//       });
//       await newUser.save();
//       console.log('User created:', newUser);
//   } catch (error) {
//       console.error('Error creating user:', error);
//   }
// };

// createUser();

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))



//get routes
app.get("/", (req,res)=>{
    res.render("index.ejs");

})
app.get("/signup_user", (req,res)=>{
    res.render("user_signup.ejs")
})
app.get("/login_user", (req,res)=>{
    res.render("user_login.ejs")
})
app.get("/signup_driver", (req,res)=>{
    res.render("driver_signup.ejs")
})
app.get("/login_driver", (req,res)=>{
    res.render("driver_login.ejs")
})
app.get("/signup_volunteer", (req,res)=>{
    res.render("vol_signup.ejs")
})
app.get("/login_vol", (req,res)=>{
    res.render("vol_login.ejs")
})
app.get("/book_cab", (req,res)=>{
    res.render("book_cab.ejs")
})
app.get("/account", (req,res)=>{
    res.render("acc.ejs")
})

//post routes
app.post("/signup_user", (req,res)=>{
  const phone = req.body.phoneNo;
  const pass = req.body.password;


  const createUser = async () => {
    try {
        const newUser = new User({
            
            phone: phone,
            password: pass
        });
        await newUser.save();
        console.log('User created:', newUser);
        res.render("acc.ejs")
    } catch (error) {
        console.error('Error creating user:', error);
    }
  };
  
  const checkUser = async (condition) => {
    try {
      // Find a document that matches the condition
      const user = await User.findOne(condition);
      
      // Check if the document exists
      if (user) {
          console.log('User exists:', user);
          res.send("Phone Number already Registerd")
      } else {
        createUser();
      }
  } catch (error) {
      console.error('Error checking row:', error);
  }
  }

  
checkUser({ phone: phone });

})

app.post("/login_user", (req,res)=>{
  const phone = req.body.phoneNo;
  const pass = req.body.password;
  
  const checkPhone = async (condition) => {
    try {
      // Find a document that matches the condition
      const user = await User.findOne(condition);
      
      // Check if the document exists
      if (user) {
          console.log('User exists:', user);
          const checkPass = async (condition) => {
            try{
              const user = await User.findOne(condition);

              if (user) {
                res.render("acc.ejs")
              }else{
                res.send("Wrong Password!")
              }
              
            }catch (error){
              console.error('Error Checking Password');
            }
          }
          checkPass({password:pass})
      } else {
        res.send("No User with the specified phone number is registered, please register")
      }
  } catch (error) {
      console.error('Error checking row:', error);
  }
  }

  checkPhone({ phone: phone });
  
})


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})