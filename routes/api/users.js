const express = require('express');
const router = express.Router();
const gravatar  = require('gravatar');
const config = require('config');
const bcrypt = require('bcryptjs');
const User = require('../../modles/User');
// for checking the validations
const { body, validationResult } = require('express-validator');
const { JsonWebTokenError } = require('jsonwebtoken');
//now this becomes our mini app 
router.post('/', 
    body('name').not().isEmpty(),
    body('email').isEmpty(),
    body('password').isLength({min: 6}),
    async (req,res) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        // before sending the data of a user we need to check whether it exit ornot
        const {name, email,password} = req.body;
        try{
            // using the mongoose model to find the qurey
            let user = await User.findOne({email});
            if(user){
                // if user already exits display the message
                return res.status(400).json({errors: [{msg: "User Already Exits."}]});
            }
            const avatar = gravatar.url(email,{
                s: '200',
                r: 'pg',
                d: 'mm'
            })

            user = new User({
                name,
                email,
                avatar,
                password
            });
            //encrypting the user
            const salt = await bcrypt.genSalt(10); // returns a promise
            user.password = await bcrypt.hash(password,salt);

            // save
            await user.save();
            //jason web token
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