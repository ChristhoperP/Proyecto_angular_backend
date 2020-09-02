'use strict'

var User = require('../models/user');
const bcrypt = require('bcrypt');

var controller = {
    home: function (req, res) {
        return res.status(200).send({
            message: 'Soy la home'
        });
    },
    test: function (req, res) {
        return res.status(200).send({
            message: 'Soy el metodo o accion test del controlador de project'
        });
    },
    saveUser: function (req, res){
        var user = new User();

        var params = req.body;
        user.nombre = params.nombre;
        user.apellidos = params.apellidos;
        user.username = params.username;
        user.email = params.email;

        //encriptando contraseña
        bcrypt.hash(params.password, 10, function(err, hash) {

            if(err) return res.status(500).send({error: err});

            user.password=hash;
            user.save((err, userStored)=>{
                if(err) return res.status(500).send({message: err});
    
                if(!userStored) return res.status(404).send({message: 'No se ha podido guardar el usuario'});
    
                return res.status(200).send({user: userStored});
            });
        });
        
    }
};

module.exports = controller;