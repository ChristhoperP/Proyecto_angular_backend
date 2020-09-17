'use strict'

//const User = require('../models/user');

// Conexion a postgres
const { pool } = require('../conexion');

async function isExist(req, res, next) {
    
    /* await User.find({ username: req.body.username }, (err, user) => {
        if (err) return res.status(500).send({ message: `Error al verificar username: ${err}` });
        if (user[0]) return res.status(400).send({ message: 'El username ya está en uso.' });

        next();
    }); */

    const query = {
        // give the query a unique name
        name: 'username-exist',
        text: 'SELECT username FROM users WHERE username = $1 ',
        values: [req.body.username],
    }
    await pool.query(query, (err, user) => {
        if (err) return res.status(500).send({ message: `Error al verificar username: ${err.stack}` });

        if (user.rows[0]) return res.status(400).send({ message: 'El username ya está en uso.' });

        next();
    })

}
module.exports = { isExist }