const jwt = require('jsonwebtoken');
const config = require('config');

module.exports= function(req,res,next){
    const token = req.headrer('x-auth-token');

    if(!token){
        return res.status(401).json({msg: "No token,authorization denied"});
    }
    // verify token
    try{
        const decode = jwt.verify(token,config.get('jsontoken'));
        req.user = decode.user;
        next();
    }
    catch(err){
        res.status(401).json({msg: "Token is invalid"});
    }
}