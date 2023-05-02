const mongoose=require("mongoose");

const postsSchema=mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    device:{type:String,required:true}    
},{
    versionKey:false
})

const NotesModel=mongoose.model("user",postsSchema);

module.exports={PostsModel}