'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var rutas = require('./config');

mongoose.Promise = global.Promise;
mongoose.connect(rutas.db, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>{
            console.log("Conexión a la base de datos establecida con éxito.");

            //Creación del servidor
            app.listen(rutas.port, ()=>{
                console.log(`Servidor corriendo correctamente en el puerto: ${rutas.port}`);
            });
        })
        .catch(err=>console.log(err));