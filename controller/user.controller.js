const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const _ = require('lodash');

// registration
module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if(err) {
            if (err.code == 11000){
                // status code 422 means Unprocessable Entity
                res.status(422).send('This email is already registered!!!');
            } else {
                // handle errors globaly in app.js file
                return next(err);
            }
        }
        else { res.send(doc);}
    });
}

// login & authentication
module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err){
            return res.status(400).json(err);
        }
        // registered user
        else if(user){
            return res.status(200).json({ 'token': user.generateJwt() });
        }
        // unknown user or wrong password
        else{
            return res.status(404).json(info);
        }
    })(req, res);
}

// user profile
module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id : req._id }, (err, user) => {
        if (!user)
            return res.status(404).send({ status: false, massage : 'User record not found'});
        else
            res.status(200).send({ status: true, user: _.pick(user, ['fullName', 'email'])})
    });
}