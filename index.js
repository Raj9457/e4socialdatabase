const express=require("express");
const cors=require("cors");
const { connection } = require("./db");
const { UserRouter } = require("./Routes/user.routes");
const { auth } = require("./Middleware/Auth.middleware");
const { PostsRouter } = require("./Routes/posts.routes");
const app=express();

app.use(express.json())
app.use(cors());

app.use("/users",UserRouter)
app.use(auth);
app.use("/posts",PostsRouter)
app.listen(8080,async()=>{
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
        console.log("Not able to connect to db")
    }
    console.log("Server is running");
})