const jwt = require('jsonwebtoken');

module.exports.Auth = async (req, res, next) => {
    try{

        let token = req.headers.authorization.split(' ')[1];

        let data = await jwt.verify(token, process.env.JWT_SECRET);
        
        if( data )next();

    }catch(error){
        res.status(401).json({message:`Authentication fail : ${error.message}`});
    }
}