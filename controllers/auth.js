'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const service = require('../services/token')

function signUp(req, res) {

    //VALIDAR DATOS ENVIADOS

    var user = new User({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        username: req.body.username,
        email: req.body.email
    })

    bcrypt.hash(req.body.password, 10, function(err, hash) {

        if(err) return res.status(500).send({error: err});
        user.password=hash;

        user.save((err)=>{
            if(err) return res.status(500).send({message: `Error al crear el usuario: ${err}`});

            return res.status(200).send({token: service.createToken(user)});
        })
    })
}

function signIn(req, res) {
    if(!req.body.username || !req.body.password) return res.status(404).send({message: "Ingrese usuario o contraseña"})

    User.find({$or:[{email: req.body.username}, {username: req.body.username}]}, (err,user) => {
        if(err) return res.status(500).send({message: err})
        if(!user || Object.entries(user).length === 0) return res.status(404).send({message: "no existe el usuario"})

        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(err) return res.status(500).send({message: `Error al comparar contraseñas: ${err}`})
            if(!result) return res.status(404).send({message: 'La contraseña es incorrecta'})
            
            //req.user = user
            return res.status(200).send({
                message: 'Te has logueado correctamente',
                token: service.createToken(user)
            })
        });

    }).select('+password')
}

module.exports = {
    signUp,
    signIn
}