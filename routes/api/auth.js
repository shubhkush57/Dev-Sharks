const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const { body, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const User = require('../../modles/User');

router.get('/', async (req,res) =>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch(err){ 
        res.status(500).send('server error');
    }
});

router.post('/', 
    body('email').isEmpty(),
    body('password').exists(),
    async (req,res) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        // before sending the data of a user we need to check whether it exit ornot
        const {email,password} = req.body;
        try{
            // using the mongoose model to find the qurey
            let user = await User.findOne({email});
            if(!user){
                // if not a user
                return res.status(400).json({errors: [{msg: "Invalid Credentials"}]});
            }
        
            //jason web token
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res.status(400).json({errors: [{msg: "Invalid Credentials"}]});
            }
            const payload = {
                user:{
                    id: user.id // mongoDb it 
                }
            }
            jwt.sign(
                payload,
                config.get('jsontoken'),
                {expiresIn: 360000},
                (err,token) =>{
                    if(err){
                        throw err;
                    }
                    re.json({token});
                }
            )
        }   
        catch(error){
            console.log(error);
        }

        res.send('User working ....');
    });

module.exports = router;