const mongoose = require('mongoose')
const { Schema , model } = mongoose

const PostSchema = new Schema({
    title : {require : true , type : String},
    imageUrl : {require : true , type : String},
    content : {require : true , type : String},
    author : {type : Schema.Types.ObjectId , ref : "User"}
},
{
    timestamps : true
}
);

const PostModel = model("Post" , PostSchema)

module.exports = PostModel;