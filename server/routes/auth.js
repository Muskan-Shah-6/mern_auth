import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// Register
router.post("/register" , async(req, res) =>{
    try{
        const {username, email, password} = req.body;
        // checking if user already exist or what

        const isUserExist = await User.findOne({email});
        if(isUserExist){
            return res.status(400).json({msg :"User already exists"});
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const addNewUser = new User({username, email , password:hashPassword})
        await addNewUser.save();

        res.json({msg:"User registered successfully"})

    }catch(err){
        res.status(500).json({error: err.message})
    }
});

// Login

router.post("/login", async(req, res) =>{
   try{
     const {email, password} = req.body

    // checking if email exist or not (user validation)
    const isValid = await User.findOne({email});
    if(!isValid){
        return res.status(400).json({msg:"User not found"})
    }

    // Validating password and email (Credentials)
     const isMatch = await bcrypt.compare(password, isValid.password)
     if(!isMatch){
        return res.status(400).json({msg:"Invalid credentials"})
     }

    //  checking token
    const token = jwt.sign({id:isValid._id}, process.env.JWT_SECRET, {expiresIn: "1h"});

    res.json({
        msg : "Login Successfully",
        token, isValid: {id: isValid._id, username: isValid.username, email: isValid.email}})
    
    
   }catch(err){
    res.status(500).json({error: err.message})
   }

})

router.get('/getData', async(req, res) =>{
    try{
        const users = await User.find()
        res.json(users)
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

// Get user by id
router.get("/:id", async(req, res) =>{
    try{
        const getUserbyId = await User.findById(req.params.id).select("username email");
        if(!getUserbyId) return res.status(401).json({msg:"User not found"})
            res.json(getUserbyId)
    }catch(err){
        res.status(500).json({msg:"Server error"})
    }
})

export default router
