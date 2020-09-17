'use strict'

//const User = require('../models/user')
const bcrypt = require('bcrypt')
const service = require('../services/token')


// Conexion a postgres
const { pool } = require('../conexion');


async function signUp(req, res) {


    var user = {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        username: req.body.username,
        email: req.body.email,
        password: ''
    }

    //var user2 = {};

    bcrypt.hash(req.body.password, 10, async function (err, hash) {

        if (err) return res.status(500).send({ error1: err });
        user.password = hash;

        await pool.query('INSERT INTO users (nombre, apellidos, username, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *', [user.nombre, user.apellidos, user.username, user.email, user.password], (err, respuesta) => {
            if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err.stack}` });

            /* user2 = respuesta.rows[0];
            user2._id = respuesta.rows[0].id; */
            return res.status(200).send({ token: service.createToken(respuesta.rows[0]) });
        });

        //Con mongoose
        /* await user.save((err, user) => {
            if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` });

            return res.status(200).send({ token: service.createToken(user) });
        }) */
    })
}

async function signIn(req, res) {
    if (!req.body.username || !req.body.password) return res.status(404).send({ message: "Ingrese usuario o contraseña" })

    /* await User.find({ $or: [{ email: req.body.username }, { username: req.body.username }] }, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user || Object.entries(user).length === 0) return res.status(404).send({ message: "no existe el usuario" })

        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) return res.status(500).send({ message: `Error al comparar contraseñas: ${err}` })
            if (!result) return res.status(404).send({ message: 'La contraseña es incorrecta' })

            //req.user = user
            return res.status(200).send({
                message: 'Te has logueado correctamente',
                token: service.createToken(user[0])
            })
        });

    }).select('+password') */

    const query = {
        // give the query a unique name
        name: 'login-user',
        text: 'SELECT id, password FROM users WHERE email = $1 or username = $1 ',
        values: [req.body.username],
    }
    // callback
    await pool.query(query, (err, user) => {
        if (err) {
            return res.status(500).send({ message: `Error al comparar contraseñas: ${err.stack}` });
        } 
        if (!user.rows[0] || Object.entries(user.rows[0]).length === 0) return res.status(404).send({ message: "no existe el usuario" })

        /* return res.status(200).send({
            message: 'Te has logueado correctamente',
            token: user.rows[0]
        }) */

        bcrypt.compare(req.body.password, user.rows[0].password, (err, result) => {
            if (err) return res.status(500).send({ message: `Error al comparar contraseñas: ${err}` })
            if (!result) return res.status(404).send({ message: 'La contraseña es incorrecta' })

            /* var user2 = user.rows[0];
            user2._id = user.rows[0].id; */

            return res.status(200).send({
                message: 'Te has logueado correctamente',
                token: service.createToken(user.rows[0])
            })
        });
    })
}

module.exports = {
    signUp,
    signIn
}