const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const Group = require('../../models/group/Group');
const config = require('config');
const auth = require('../../middleware/auth');
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

module.exports = router;
