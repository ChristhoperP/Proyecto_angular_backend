'use strict'

const User = require('../models/user');

async function isExist(req, res, next) {
    
    await User.find({ username: req.body.username }, (err, user) => {
        if (err) return res.status(500).send({ message: `Error al verificar username: ${err}` });
        if (user[0]) return res.status(400).send({ message: 'El username ya está en uso.' });

        next();
    });

}
module.exports = { isExist }