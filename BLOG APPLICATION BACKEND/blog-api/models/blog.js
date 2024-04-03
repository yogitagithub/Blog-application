const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    

 title: {
    type: String,
    required: [true, "title is required"],
    
},
description: {
    type: String,
    required: [true, "description is required"]
    
},


categoryDescription: {
    type: String,
    required: [true, "category description is required"]
},



 },{
    timestamps: true
});


const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;