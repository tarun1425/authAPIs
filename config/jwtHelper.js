// this file help for check given private route authenticated or not
const jwt = require('jsonwebtoken');

module.exports.verifyJwtToken = (req, res, next) => {
    var token;
    if ('authorization' in req.headers)
        token = req.headers['authorization'].split(' ')[1];
    if (!token)
        return res.status(403).send({auth : false, massage: 'No token provided'});
    else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err)
                return res.status(500).send({auth : false, massage: 'Token authentication failed'});
            else {
                req._id = decode._id;
                next();
            }
        })
    }
}
