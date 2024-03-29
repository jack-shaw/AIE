const jwt = require('jsonwebtoken');

function authAdmin(req, res, next){
    let token = req.header('token');
    console.log(token)
    if(!token)
        return res.status(401).send('Access denied. No Token Provided!');
    else{
        try{
            let decoded = jwt.verify(token, 'AdminJwtKey');
            req.admin = decoded;
            next();
        }
        catch (error) {
            res.status(400).send('Invalid token!');
        }
    }
}

function authMember(req, res, next){
    let token = req.header('token');
    if(!token)
        return res.status(401).send('Access denied. No Token Provided!');
    else{
        try{
            let decoded = jwt.verify(token, 'memberJwtKey');
            req.member = decoded;
            next();
        }
        catch (e) {
            res.status(400).send('Invalid token!');
        }
    }
}



module.exports.authAdmin = authAdmin;
module.exports.authMember = authMember;