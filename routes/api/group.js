const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const Group = require('../../models/group/Group');
const config = require('config');
const auth = require('../../middleware/auth');
const JoinedGroups  = require('../../models/user/JoinedGroup');
//@route /api/group/create
//@desc create a group
//private after created public
router.post('/create',[
    auth,[
        body('title','title is required').not().isEmpty(),
        body('descp','descp is required').not().isEmpty(),
        body(
            'tags',
            'Please attch some tags to the group'
          ).isLength({ min: 4 }),
        ]
    ],
    async (req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        // upcoming data
        const {title,descp,tags} = req.body;
        const groupFields = {};
        groupFields.user = req.user.id;
        groupFields.title = title;
        groupFields.descp = descp;
        groupFields.tags = tags;
        try{
            let Grouptitle = await Group.findOne({title});
            if(Grouptitle){
                return res.status(400).json({errors:[{msg: 'Already a group has been created'}]});
            }
            const group = new Group(groupFields);
            await group.save();
            res.json(group);    
        }
        catch(error){
            console.log(error.message);
            res.status(500).send('Server Error');
        }
    }
);

//@route /api/dashboard
//desc getting all the joined group
router.get('/',auth,async (req,res)=>{
    try{
        const group = await Group.find({user: req.user.id});
        // const group = await Group.find();
        console.log(group.length);
        if(!group){
            res.json({msg: 'You have not created any group'});
        }
        res.json(group);
    }catch(error){
        console.log('Did not get any group');
        res.status(500).send('Server Error');
    }
});


//@route /api/dashboard
//desc getting all the group
router.get('/all/',auth,async (req,res)=>{
    try{

        const group = await Group.find();
        console.log(group);
        // const group = await Group.find();
        console.log(group.length);
        if(!group){
            res.json({msg: 'You have not created any group'});
        }
        res.json(group);
    }catch(error){
        console.log('Did not get any group');
        res.status(500).send('Server Error');
    }
});
//---------------------------------------------------------------------------
//@route /api/group/join
//@desc to join the group
router.post('/join',[auth,
    [   
        body('id', 'id is required').not().isEmpty(),
    ]
    ],async (req,res)=>{
    console.log("In the router join group....");
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log('Error in the router join')
        console.log(errors);
        return res.status(400).json({errors: errors.array()});
    }
    
    try{
        console.log('in the try block')
        console.log(req.user)
        let joinedgroup = await JoinedGroups.findOne({user: req.user.id, id: req.body.id });
        console.log(1);
        if(joinedgroup){
            console.log(4);
            return res.status(400).json({errors:[{msg: 'Already joined the group'}]});
        }
        console.log(2);
        console.log(req.body.group);
        const joinGroup = new JoinedGroups({
            user: req.user.id,
            id:req.body.id
        });
        console.log(3);
        await joinGroup.save();
        console.log('Group Joined by you successsfully');
        res.json(joinGroup);
    }
    catch(error){
        console.log('Error in the backend post join metods')
        console.log(errors.message);
        res.status(500).send('server error');
    }
});

//@route /api/group/join
//@desc getting the all the joined group data
router.get('/join',auth,async(req,res) =>{
    try{
        console.log('In router we r getting the data of joined grups');
        const joingroups = await Group.find({user: req.user.id});
        console.log(joingroups);
        if(!joingroups){
            return res.json({msg: 'You have not joined any group'});
        }
        console.log('Groups get by you successfullly');
        res.json(joingroups);
    }
    catch(error){
        return res.status(400).json({msg: 'Server Error'});
    }
});
//----------------------------------------------------------------------------------------

module.exports = router;
