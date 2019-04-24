var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user')

router.get('/login', (req, res) => {
  if(req.signedCookies.email) {
    res.redirect('profile')
  } else {
    res.render('login')
  }
})

router.post("/login",(req,res)=>{
    User.findOne({email:req.body.email},(err,user)=>{
      if(err) res.send("error")
      else if (!user){ res.send("Wrong login information")}
      else {
        bcrypt.compare(req.body.password, user.password, (err, equal) => {
          if(equal){
            res.cookie("email", req.body.email, {signed:true})
            res.redirect("profile")
          }
          else {
            res.send("Wrong password")
          }
      });
      }
    })
  })

router.get('/profile', (req, res) => {
  User.findOne({email: req.signedCookies.email}, (err, user) => {
    if(req.signedCookies.email) {
    res.render('profile', {user})
  } else {
    res.redirect('login')
  }
  })
})

router.get('/profile/logout', (req, res) => {
  res.clearCookie('email');
  res.redirect('/');
})
  
module.exports = router;