'use strict'

//const User = require('../models/user');

// Conexion a postgres
const { pool } = require('../conexion');

async function isExist(req, res, next) {
    
    /* await User.find({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send({ message: `Error al verificar email: ${err}` });
        if (user[0]) return res.status(400).send({ message: 'El email ya está en uso.' });

        next();
    }); */

    const query = {
        // give the query a unique name
        name: 'email-exist',
        text: 'SELECT email FROM users WHERE email = $1 ',
        values: [req.body.email],
    }
    await pool.query(query, (err, user) => {
        if (err) return res.status(500).send({ message: `Error al comparar contraseñas: ${err.stack}` });

        if (user.rows[0]) return res.status(400).send({ message: 'El email ya está en uso.' });

        next();
    })

}
module.exports = { isExist }