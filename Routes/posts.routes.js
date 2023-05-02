const express=require("express");
const { PostsModel } = require("../Models/Posts.model");

const PostsRouter=express.Router();

PostsRouter.get("/",async(req,res)=>{
    
    try {
        const data=await PostsModel.find({authorID:req.body.authorID});
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({"error":error.message});
    }    
})

PostsRouter.patch("/update/:id",async (req,res)=>{
    const id=req.params.id;
    const postsdata=await PostsModel.findOne({_id:id});
    try {
        if(req.body.authorID!=postsdata.authorID){
            res.status(200).send({"msg":"You are not authorised to change the data"});
        }
        else{
            const data=await PostsModel.findByIdAndUpdate({_id:id},req.body);
            res.status(200).send({"msg":"Post has been updated"});
        }
    } catch (error) {
        res.status(400).send({"error":error.message});
    }
})

PostsRouter.delete("/delete/:id",(req,res)=>{
    const id=req.params.id;
    const postsdata=await PostsModel.findOne({_id:id});
    try {
        if(req.body.authorID!=postsdata.authorID){
            res.status(200).send({"msg":"You are not authorised to change the data"});
        }
        else{
            const data=await PostsModel.findByIdAndDelete({_id:id});
            res.status(200).send({"msg":"Post has been deleted"});
        }
    } catch (error) {
        res.status(400).send({"error":error.message});
    }
})



module.exports={PostsRouter}