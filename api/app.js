const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose")
const dotenv = require('dotenv').config()
const bcrypt = require("bcrypt")

const User = require("./models/User")

const app = express();

app.use(cors({credentials : true , origin:"http://localhost:5173"}))

app.use(express.json())

mongoose.connect(process.env.MONGO_URL)

const salt = bcrypt.genSaltSync(10)

app.post("/register" , async(req,res)=>{
    const {username , password} = req.body;

    const userDoc = await User.create({
        username,
        password : bcrypt.hashSync(password , salt)
    })

    res.json(userDoc)
})

app.listen(8080);