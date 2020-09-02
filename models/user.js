'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

var UserSchema = Schema({
    nombre: {type: String, required:true},
    apellidos: {type: String, required:true},
    username: {type: String, required:true, unique: true},
    email: {type: String, required:true, unique: true, lowercase:true},
    password: {type: String, required:true, select: false},
    signupDate: {type: Date, default: Date.now()},
    lastlogin: Date
});

/* UserSchema.pre('save', (next) => {
    let user = this;
    if(!user.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err);

        bcrypt.hash(user.password, salt, null, (err, hash)=>{
            if(err) return next(err);

            user.password = hash;
            next();
        });
    });
}); */

module.exports = mongoose.model('User', UserSchema);