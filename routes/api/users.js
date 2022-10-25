const express = require('express');
const router = express.Router();
// for checking the validations
const { body, validationResult } = require('express-validator');
//now this becomes our mini app 
router.post('/', 
    body('name').not().isEmpty(),
    body('email').isEmpty(),
    body('password').isLength({min: 6}),
    (req,res) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        // res.send(req.body); // we need to parse it 
        res.send('User working ....');
    })

module.exports = router;