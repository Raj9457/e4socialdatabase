const express=require("express");
const UserRouter=express.Router();
const bcrypt = require('bcrypt');
const { UserModel } = require("../Models/User.model");
const saltRounds = 5;
const jwt = require('jsonwebtoken');
UserRouter.post("/register",(req,res)=>{
    const {name,email,gender,password}=req.body;
    try {
        bcrypt.hash(password, saltRounds, async(err, hash)=> {
            // Store hash in your password DB.
            let data=new UserModel({name,email,gender,password:hash});
            await data.save();
            res.status(200).send({"msg":"User has been registered"});
        });        
    } catch (error) {
        res.status(400).send({"error":error.message});
    }

})

UserRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        let data=await UserModel.findOne({email});
        if(data){
            bcrypt.compare(password, data.password, (err, result)=> {
                // result == true
                if(result){
                    const token = jwt.sign({ authorID:data._id,author:data.name }, 'masai');
                    res.status(200).send({"msg":"Login Successful","token":token});
                }
                else{
                    res.status(200).send({"msg":"Wrong Credentials"})
                }
            });
        }
    } catch (error) {
        res.status(400).send({"error":error.message});
    }

})

module.exports={UserRouter};