'use strict'

var mongoose = require('mongoose');
var app = require('./app');
app.set('port', process.env.PORT || 3700);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://christhoper:honduras100@cluster0-bh6yp.mongodb.net/gatitos?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>{
            console.log("Conexión a la base de datos establecida con éxito.");

            //Creación del servidor
            app.listen(app.get('port'), ()=>{
                console.log(`Servidor corriendo correctamente en el puerto: ${app.get('port')}`);
            });
        })
        .catch(err=>console.log(err));