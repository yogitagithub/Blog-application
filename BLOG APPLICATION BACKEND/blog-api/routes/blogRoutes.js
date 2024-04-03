const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const Blog = require('../models/blog')


router.get('/test',auth, (req, res) => {
    res.json({
        message: 'Blog routes are working',
        user: req.user
    });
});

//create a blog
router.post('/blogs', async (req, res) => {
    try {
        const { title, description, categoryDescription } = req.body;
        if (!title || !description || !categoryDescription) {
                 return res.status(400).send({
                   success: false,
                   message: "Please Provide ALl Fields",
                 });
               }
                             const newBlog = new Blog({title,description,categoryDescription});
await newBlog.save();
return res.status(201).send({
    success: true,
    message: 'Blog created successfully',
    newBlog,
})
        
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while creating blog',
            error
        })
    }
});

//get all blogs
router.get('/blogs', async (req, res) => {
    try {
      const blogs = await Blog.find({});
      if (!blogs) {
        return res.status(200).send({
          success: false,
          message: "No Blogs Found",
        });
      }
      return res.status(200).send({
        success: true,
        BlogCount: blogs.length,
        message: "All Blogs lists",
        blogs,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error WHile Getting Blogs",
        error,
      });
    }
  });

//get a blog by id
router.get('/blogs/:id', async (req,res)=>{
  try{
    const {id} = req.params;
    const blog = await Blog.findById(id);
    if(!blog) {
        return res.status(400).send({
            success: false,
            message: 'Blog not found with this id'
        })
    }
    return res.status(200).send({
        success: true,
        message: 'Fetched single blog',
        blog
    });
        } catch (error) {
       console.log(error);
       return res.status(400).send({
        success: false,
        message: 'Error while creating single blog',
        error
       })
    }
});

// update a blog by id
router.put('/blogs/:id', async (req,res)=>{
    try{
        const {id} = req.params;
        const {title,description,categoryDescription} = req.body;
        const blog = await Blog.findByIdAndUpdate(id, {...req.body}, {new: true})
        return res.status(200).send({
            success: true,
            message: 'Blog updated',
            blog,
        });
} catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while updating blog',
            error
        });
    }
});

// delete a blog by id
router.delete('/blogs/:id', async (req,res)=>{
    try{
        await Blog.findOneAndDelete(req.params.id);
        return res.status(200).send({
            success: true,
            message: 'Blog deleted successfully'
        })
        } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while deleting blog',
            error
        })
    }
})

module.exports = router;