const express = require('express');
const router = express.Router();

// models
const User = require('../Models/User');

// signup 
router.post('/signup', async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        console.log(req.body);
        console.log(user);

        if (!user) {
            const createdUser = new User(req.body);
            await createdUser.save();
            
            res.status(200).json({message: "User created successfully"});
        }
        else {
            res.status(404).json({message: "User already exists"});
        }
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
})

// login 
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});

        if (!user) {
            res.status(404).json({message: "User doesn't exists, please signup!"});
        }
        else {
            if (user.password === req.body.password) {
                const {password, ...rest} = user._doc;
                res.status(200).json({message: "User logged in successfully", userDetails: {...rest}});
            }
            else {
                res.status(404).json({message: "Incorrect Password!"});
            }
        }
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
})

// get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({message: "Users fetched successfully!", usersArr: users});
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
})


module.exports = router;