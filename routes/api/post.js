const express = require('express');
const router = express.Router();
const {body,valdiationResult, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const Post = require('../../modles/Post');
const User = require('../../modles/User');
const Profile = require('../../modles/Profile');
router.post('/',[auth,body('text','text Should not be empty').not().isEmpty()],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({msg: 'text is invalid'})
    }
    // selected user 
    try{
        const user = await User.findById(req.user.id).select('-password');
        const newPost =new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user : req.user.id
        });
        const post = await newPost.save();
        req.json(post);
    }
    catch(err){
        res.status(5000).json({msg: 'Server Error'});
    }

});
//@router GET /api/posts
//@desc getting all the posts
//@acess public

router.get('/',auth,(req,res)=>{
    try{
        const posts = Post.find().sort({date: -1}); // finding all the posts in the soreted order
        res.json(posts);
    }
    catch(error){
        res.status(500).send('Server Error');
    }
});

//@router GET /api/posts:post_id
//@desc getting all the posts accroding to their id
//@acess public

router.get('/:post_id',auth,(req,res)=>{
    try{
        const post = Post.findById(req.params.post_id); // finding all the posts in the soreted order
        if(!post){
            return res.status(404).json({msg: 'Post not Found'});
        }
        res.json(post);
    }
    catch(error){
        res.status(500).send('Server Error');
    }
});
//@router DELETE /api/posts:post_id
//@desc deleting the post 
//@acess public

router.delete('/:post_id',auth,async (req,res)=>{
    try{
        const post = Post.findById(req.params.post_id); // finding all the posts in the soreted order
        if(!post){
            return req.status(404).json({msg: "Page not Found"});
        }
        if(post.user.toString() != req.user.id){
            return req.status(401).json({msg: "User are not authorized"});
        }
        await post.remove();
        res.json({msg: 'post removed'});
    }
    catch(error){
        res.status(500).send('Server Error');
        
    }
});

//@router Post /api/posts/like/:id
//@description liking the posts
//@acess public
router.post('/like/:id',auth,async (req,res)=>{
    try{
        const post = Post.findById(req.params.id); // finding the post
        // checking it's already liked or not
        // iteratre through the likes
        if(post.likes.filter(like =>like.user.toString() === req.user.id ).length >0){
            return res.status(400).json({msg: "Already Liked"});
        }
        post.likes.unshift({user: req.user.id});
        await post.save();
        res.json(post.likes);
    }
    catch(err){
        res.status(500).send('Server Error');
    }
});
//@router Post /api/posts/unlike/:id
//@description unliking the posts
//@acess public
router.post('/unlike/:id',auth,async (req,res)=>{
    try{
        const post = Post.findById(req.params.id); // finding the post
        // checking it's already liked or not
        // iteratre through the likes
        if(post.likes.filter(like =>like.user.toString() === req.user.id ).length === 0){
            // post has not been liked yet
            return res.status(400).json({msg: "Post not been liked yet"});
        }
        // find the id of the er and remove it from the likes
        const removeId = post.likes.map(like => like.user.toString()).indexOf(req.params.id);
        post.likes.splice(removeId,1);
        await post.save();
        res.json(post.likes);
    }
    catch(err){
        res.status(500).send('Server Error');
    }
});
//@route /api/post/comment/:id 
//@desc comment  on the post
//acess public
// this comment as a object is going to attached to the user 
// and post by its id then in that post comment array we are goind to append this commnet
router.post('/',[auth,body('text','text Should not be empty').not().isEmpty()],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({msg: 'text is invalid'})
    }
    // selected user 
    try{
        const user = await User.findById(req.user.id).select('-password');
        const newComment ={
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user : req.user.id
        };
        // add this to the post
        const post = Post.findById(req.user.id);
        post.comments.unshift(newComment);
        await post.save();
        req.json(post.comments);
    }
    catch(err){
        res.status(5000).json({msg: 'Server Error'});
    }
});

//@router DELETE /api/posts/comment/:id/:comment_id
//@desc deleting the comment on the post
//@acess private

router.delete('/comment/:post_id/:comment_id',auth,async (req,res)=>{
    try{
        const post = Post.findById(req.params.post_id); // finding all the posts in the soreted order
        if(!post){
            return res.status(404).send({msg: "Post not found"});
        }
        // comment is an array so we have to find it by iterating
        const comment = post.comments.find(comment=> comment.id == req.params.comment_id)
        if(!comment){
            return res.status(404).send({msg: "Comment not found"});
        }
        // get the id
        const removeId = post.comments.map(comment => comment.user.toString()).indexOf(req.params.comment_id);
        post.comments.splice(removeId,1);
        await post.save();
        res.json(post.comments);
    }
    catch(error){
        res.status(500).send('Server Error');
        
    }
});
module.exports = router;