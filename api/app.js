const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose")
const dotenv = require('dotenv').config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser')
const multer = require("multer")
const upload = multer()

const User = require("./models/User")
const Post = require("./models/Post")

const app = express();

app.use(cors({credentials : true , origin:"http://localhost:5173"}))

app.use(express.json())

app.use(cookieParser())

app.use(upload.none())

mongoose.connect(process.env.MONGO_URL)

const salt = bcrypt.genSaltSync(10)

app.post("/register" , async(req,res)=>{
    const {username , password} = req.body;

try {
        const userDoc = await User.create({
        username,
        password : bcrypt.hashSync(password , salt)
    })

    res.json(userDoc)
}catch (e) {
    res.status(400).json(e)
}
})

app.post("/login" , async(req , res)=>{
    const {username , password} = req.body;
    const userDoc = await User.findOne({username});
    const success = bcrypt.compare(password , userDoc.password);

    if(success){
        jwt.sign({username , user_id : userDoc._id},process.env.JWT_KEY,{},(err , token)=>{
            if(err) throw err;
            res.cookie("token" , token).json({
                username,
                user_id: userDoc._id,
            })
        })
    }else{
        res.status(400).json("wrong user credentials")
    }
})

app.get("/profile" , async(req , res)=>{
    const {token} = req.cookies;
    if(token){
        jwt.verify(token,process.env.JWT_KEY,{},(err,userInfo)=>{
        if(err) throw err;
        return res.status(200).json(userInfo)
    })
    }else{
        res.status(401).json({message : "not auth"})
    }
})

app.post("/logout" , async(req , res)=>{
    res.cookie("token" , "").json("Logout is successfully")
})

//CRUD Operations

//Create
app.post("/upload" , async(req ,res)=>{
const { token } = req.cookies;

if(token){
    jwt.verify(token,process.env.JWT_KEY,{},async(err , info)=>{
        if(err){
            return res.status(401).json({message: "user not auth."})
        }
        const { title , content , imageUrl } = req.body;
        const postDoc = await Post.create({
            title ,
            imageUrl ,
            content,
            author : info.user_id
        })
        res.status(200).json(postDoc)
    })
}else{
    res.status(401).json({message : "user not auth."})
}
})

//Read all

app.get("/posts" , async(req , res)=>{
    const postDocs = await Post.find().populate("author" , ["username"]).sort({createdAt : -1})
    res.status(200).json(postDocs)
})

//Read one

app.get("/post/:id" , async(req , res)=>{
    const { id } = req.params
    const postDoc = await Post.findById(id).populate("author" , ["username"])
    res.status(200).json(postDoc)
})

//Update get old data

app.get(`/post-edit/:id` , async(req , res)=>{
    const { id } = req.params
    const postDoc = await Post.findById(id)
    res.status(200).json(postDoc)
})

//Update real update

app.put('/edit-post' , async(req , res) => {
    const { token } = req.cookies;

if(token){
    jwt.verify(token,process.env.JWT_KEY,{},async(err , info)=>{
if(err){
            return res.status(401).json({message: "user not auth."})
        }
        const { title , content , imageUrl , post__id , author_id } = req.body;
         const postDoc = await Post.findById(post__id);
        if( author_id === info.user_id ){
        postDoc.title = title;
        postDoc.imageUrl = imageUrl;
        postDoc.content = content;
        postDoc.save();
        // return res.status(200).json(postDoc)
        }
            res.status(200).json("your not post owner")
        
    })
}else{
    res.status(401).json({message : "user not auth."})
}

})

//Delete Post

app.delete("/post-delete/:id" , async(req ,res) => {
    const { token } = req.cookies;
    
if(token){
    jwt.verify(token,process.env.JWT_KEY,{},async(err , info)=>{
    if(err){
            return res.status(401).json({message: "user not auth."})
        }
        const {id} = req.params;
        const { author_id } = req.body;

        if(author_id === info.user_id){
              await Post.findByIdAndDelete(id);
        }
            res.status(200).json("Delte Post")
    })
}else{
    res.status(401).json({message : "user not auth."})
}
}) 

app.listen(8080);

