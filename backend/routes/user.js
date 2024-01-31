const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { User } = require("../db");

const router = express.router();

// Signup route
const signupBody = z.object({
    username: z.string().email(),
    firstName : z.string(),
    lastName : z.string(),
    password : z.string()
})

router.post("/signup",async (req,res) => {
    const { sucess } = signupBody.safeParse(req.body);
    if(!sucess) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        email: req.body.username
    })

    if(existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = User.create({
        username : req.body.username,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        password : req.body.password
    })

    const userId = user._id;

    const token = jwt.sign({
        userId
    },JWT_SECRET);

    res.status(200).json({
        message: "User created successfully",
        token: token
    })
})


// SignIn Route
const signinBody = Z.object({
    username: z.string().email(),
    password: z.string()
})

router.post("/signin",async (req,res) => {
const { sucess } = req.body.safeParse(signinBody);

if(!sucess) {
    return res.status(411).json({
        message:"Incorrect details"
    })
}

const user = await User.findOne({
    username: req.body.username,
    password: req.body.password
})

if(user) {
    const token = jwt.sign({
        userId: user._id
    },JWT_SECRET)

    return res.status(411).json({
        message: "Success",
        token: token
    })
}

res.status(411).json({
    message: " Error while logging in."
})


})
module.exports = router;
