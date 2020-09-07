'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const service = require('../services/token')

async function signUp(req, res) {

    //VALIDAR DATOS ENVIADOS
    /* await User.find({ username: req.body.username }, (err, user) => {
        if (err) return res.status(500).send({ message: `Error al verificar username: ${err}` });
        if (user) return res.status(400).send({ message: 'El username ya está en uso.' });
    });

    await User.find({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send({ message: `Error al verificar el email: ${err}` });
        if (user) return res.status(400).send({ message: 'El email ya está en uso.' });
    }); */

    var user = new User({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        username: req.body.username,
        email: req.body.email
    })

    bcrypt.hash(req.body.password, 10, async function (err, hash) {

        if (err) return res.status(500).send({ error1: err });
        user.password = hash;

        await user.save((err, user) => {
            if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` });

            return res.status(200).send({ token: service.createToken(user) });
        })
    })
}

async function signIn(req, res) {
    if (!req.body.username || !req.body.password) return res.status(404).send({ message: "Ingrese usuario o contraseña" })

    await User.find({ $or: [{ email: req.body.username }, { username: req.body.username }] }, (err, user) => {
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

    }).select('+password')
}

module.exports = {
    signUp,
    signIn
}