const jwt=require("jsonwebtoken");

const auth=(req,res,next)=>{
    const token=req.headers.authorization;
    try {
        if(token){
            let decoded= jwt.verify(token.split(" ")[1], 'masai');
            if(decoded){
                req.body.authorID=decoded.authorID;
                req.body.author=decoded.author;
                next();
            }
            else{
                res.status(200).send({"msg":"Please Login First"});
            }
        }
    } catch (error) {
        res.status(400).send({"error":error.message});
    }
}

module.exports={auth}