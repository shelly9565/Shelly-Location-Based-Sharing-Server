const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        const token = jwt.sign({ email: user.email, userId: user._id }, 'long_string', { expiresIn: "1h" });
        user.save().then(result => {
            res.status(201).json({
                message: 'User created',
                result: result,
                token: token,
                expiresIn: 3600
            });
        }).catch(err => {
            res.status(500).json({
                message: "Invalid authentication credentials!"
            });
        })
    });
};

exports.loginUser = (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Auto failed"
            });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password)
    }).then(result => {
        if (!result) {
            return res.status(401).json({
                message: "Auth failed"
            });
        }
        const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id }, 'long_string', { expiresIn: "1h" });
        res.status(200).json({
            token: token,
            expiresIn: 3600,
            userId: fetchedUser._id
        });
    }).catch(err => {
        return res.status(401).json({
            message: "Auth failed"
        });
    });
};


exports.getUsers = (req, res, next) => {
    User.find()
      .then(users => {
        res.status(200).json({
          message: "Events users successfully!",
          users: users
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Fetching users failed!"
        });
      });
  };