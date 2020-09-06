'use strict'

var User = require('../models/user');
const bcrypt = require('bcrypt');
const rutas = require('../config');

var controller = {
    home: function (req, res) {
        return res.status(200).send({
            message: 'Soy la home. Ruta mongodb: '+rutas.db+' port: '+rutas.port
        });
    },
    test: function (req, res) {
        return res.status(200).send({
            message: 'Soy el metodo o accion test del controlador de project'
        });
    },
    getUser: async function (req, res){
        //console.log(req.user);
        await User.findById(req.user, (err,user) => {
            if(err) return res.status(500).send({message: err});
            if(!user || Object.entries(user).length === 0) return res.status(404).send({message: "no existe el usuario"});

            res.status(200).send(user);
        })

    }
};

module.exports = controller;