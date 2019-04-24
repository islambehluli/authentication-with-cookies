var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/user')

router.get('/signup', (req, res) => {
    res.render('signup')
})
  
router.post('/signup', (req, res) => {
    var user = {
        username: req.body.username,
        email: req.body.email
    }
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        user.password = hash
        User.create(user)
    });

    res.render('signedin');
})

module.exports = router;