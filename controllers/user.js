'use strict'

//var User = require('../models/user');
// Conexion a postgres
const { pool } = require('../conexion');

const rutas = require('../config');


var controller = {
    home: function (req, res) {
        return res.status(200).send({
            message: 'Soy la home. port: '+rutas.port
        });
    },
    test: function (req, res) {
        return res.status(200).send({
            message: 'Soy el metodo o accion test del controlador de project'
        });
    },
    getUser: async function (req, res){
        //console.log(req.user);
        /* await User.findById(req.user, (err,user) => {
            if(err) return res.status(500).send({message: err});
            if(!user || Object.entries(user).length === 0) return res.status(404).send({message: "no existe el usuario"});

            res.status(200).send(user);
        }) */

        const query = {
            // give the query a unique name
            name: 'get-user',
            text: 'SELECT * FROM users WHERE id = $1 ',
            values: [req.user],
        }
        await pool.query(query, (err, user) => {
            if (err) return res.status(500).send({ message: `Error al encontrar el usuario: ${err.stack}` });
            if (!user.rows[0] || Object.entries(user.rows[0]).length === 0) return res.status(404).send({ message: "no existe el usuario" })

            res.status(200).send(user.rows[0]);
        })

    }
};

module.exports = controller;