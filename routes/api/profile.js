const express = require('express');
const router = express.Router();
const config = require('config');
const request = require('request');
const { body, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

const Porfile = require('../../modles/Profile');
const User = require('../../modles/User');

router.get('/me', async(req,res) =>{
    try{
        const profile = await Porfile.findOne({user: req.user.id}).populate(
            'user',['name','avatar']
        );
        if(!profile){
            return res.status(400).json({msg: 'There is no profile for this user'});
        }
        res.json(profile);
    }
    catch(err){
        res.status(500).send('Server Error');
    }
})

//@route  /api/prfoile
//@des    create or update user profile
//@access private

router.post('/',[auth,[body('status','Status Field is requried').not().isEmpty(),
body('skills','skill is requried').not().isEmpty()]],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).json({msg: errors.array()})
    }
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;
    // build profile
    const profileFileds = {};
    profileFileds.user = req.user.id;
    if(company){
        profileFileds.company = company
    }
    if(website){
        profileFileds.website = website
    }
    if(location){
        profileFileds.location = location
    }
    if(bio){
        profileFileds.bio = bio
    }
    if(status){
        profileFileds.status = status
    }
    if(githubusername){
        profileFileds.githubusername = githubusername
    }
    if(skills){
        profileFileds.skills = skills.split(',').ma
        (skill=> skill.trim());
    }
    profileFileds.social = {};
    if(youtube){
        profileFileds.social.youtube = youtube
    }
    if(youtube){
        profileFileds.social.twitter = twitter
    }
    if(youtube){
        profileFileds.social.facebook = facebook
    }
    if(youtube){
        profileFileds.social.linkedin = linkedin
    }
    if(instagram){
        profileFileds.social.instagram = instagram
    }

    try{
        let profile = await Porfile.findOne({user: req.user.id});
        if(profile){
            //update
            profile = await Porfile.findOneAndUpdate({user: req.user.id},
                {$set: profileFileds},{
                new: true
            });
            return res.json(profile);
        }
        //create
        profile = new Porfile(profileFileds);
        await profile.save();
        res.json(profile);

    }
    catch(error){
        res.status(500).send('Server Error');
    }
});

//@route GET api/profile
//@desc Get all profile
//@acess public
router.get('/',async (req,res)=>{
    try{
        const profile = await Porfile.find().populate('user',['name','avatar']);
        res.json.send(profile);
    }
    catch(err){
        res.status(500).send('Server Errrors');
    }
});
//@route GET api/profile/user/:user_id
//@desc Get all profile by user id
//@acess public
router.get('/',async (req,res)=>{
    try{
        const profile = await Porfile.findOne({user:req.params.id}).populate('user',['name','avatar']);
        if(!profile){
            res.json({msg: 'Profile not found'});
        }
        res.status(400).json.send(profile);
    }
    catch(err){
        res.status(500).send('Server Errrors');
    }
});
//@route DELETE api/profile
//@desc DELETE all user , profile or posts
//@acess public
router.delete('/',async (req,res)=>{
    try{
        // remove profile
        await Porfile.findOneAndRemove({user:req.user.id});
        // remove user
        await Porfile.findByIdAndRemove({_id: req.user.id});
        res.json({msg: 'User deleted'})
    }
    catch(err){
        res.status(500).send('Server Errrors');
    }
});

//@router PUT api/profile/exprience
//@des PUT experience to put
//@acess public

router.put('/experience',[auth,[
    body('title','Tittle is required').not().isEmpty(),
    body('company','Comapny is required').not().isEmpty(),
    body('from','From date is required').not().isEmpty()
    ]],
    async (req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const {
            title,company,location,from,to,current,desc
        } = req.body;
        const newExp = {
            title,company,location,from,to,current,desc
        }
        try{
            const profile = Porfile.findOne({user: req.user.id});
            profile.experience.unshift(newExp);
            await profile.save();
            res.json(profile);
        }
        catch(err){
            res.status(500).send('Serve Error');
        }
    });

//@route DELETE api/profile/experience/:exp_id
//@desc delete experience from profile
//@acess Private
router.delete('/experience/:exp_id',auth,async(req,res)=>{
    try{
        const profile = await Porfile.findOne({user: req.user.id});
        //iteratre through all ge the id
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex,1);
        await profile.save();
        res.json(profile);
    }
    catch (err){    
        res.status(500).send('Server Error');
    }
});

//@router PUT api/profile/education
//@des PUT education to put
//@acess public
router.put('/education',[auth,[
    body('school','school is required').not().isEmpty(),
    body('degree','degree is required').not().isEmpty(),
    body('from','From date is required').not().isEmpty()
    ]],
    async (req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const {
            school,degree,fieldofstudy,from,to,current
        } = req.body;
        const newExp = {
            school,degree,fieldofstudy,from,to,current
        }
        try{
            const profile = Porfile.findOne({user: req.user.id});
            profile.education.unshift(newExp);
            await profile.save();
            res.json(profile);
        }
        catch(err){
            res.status(500).send('Serve Error');
        }
    });

//@route DELETE api/profile/education/:edu_id
//@desc delete education from profile
//@acess Private
router.delete('/education/:edu_id',auth,async(req,res)=>{
    try{
        const profile = await Porfile.findOne({user: req.user.id});
        //iteratre through all ge the id
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

        profile.education.splice(removeIndex,1);
        await profile.save();
        res.json(profile);
    }
    catch (err){    
        res.status(500).send('Server Error');
    }
});

//getting github profile
//@route GET /api/profile/github/:username
//@desc getting user repos from git hbu
//@acess Public
router.get('/github/:username',(req,res)=>{
    try{
        const options = {
            uri : `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSceretId')}`,
            method: "GET",
            headers: {'user-agent': 'node.js'}
        }
        request(options,(error,response,body)=>{
            if(error){
                res.status(400).json({msg: 'no git hub account'});
            }
            if(response.statusCode != 200){
                res.status(400).json({msg: 'no git hub account'});
            }
            res.json(JSON.parse(body));
        })
    }
    catch(err){
        res.status(500).send('Server Error');
    }
})
module.exports = router;