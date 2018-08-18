/**
  *Este archivo describe la aplicacion en express+
    ->express : Solo para hacer uso del metodo "express.static",
                no es el mismo que entra por parametros.
    ->expressValidator : Reglas para validar campos
    ->path: Se usa para hacer diferentos operaciones sobre la rustas(jerarquia de carpetas mas no las rutas de los modelos)
    ->bodyParser: En nuestro caso, define que nuestras cabeceras estan en formato Json.
    ->compression: Hace que nuestro servido comprima los archivos estaticos en .gzip
    ->lusca:  Nos brinda seguridad de cors y xss
    ->morgan: Logs de las peticiones.
**/

const express = require('express');
const expressValidator = require('express-validator');
const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('morgan');
const lusca = require('lusca');
/**
 *Es el archivo que guarda algunas constantes.
 **/
const config = require('./config');

/**
  * Estamos exportando una funcion que le entra como parametros app, esta, es una instancia de express a configurar.
**/
module.exports = function(app) {

    app.use(require('express-status-monitor')()); // Monitorear Express , peticiones, tablas de tiempo.... etc.
    app.set('port', process.env.PORT || 3000);    //Asignamos a express el puerto en que va a correr.
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(compression())
    app.use(logger('dev'));                       //Logs de desarrollador para express
    app.use(lusca.xframe('SAMEORIGIN'));          //Solo mi orgen
    app.use(lusca.xssProtection(true));
    app.use(expressValidator());
    /**
      *Servimos las carpetas estaticas.
    **/
    app.use(express.static(path.join(config.root, '/view')));
    app.use(express.static(path.join(config.root, '/public')));
};
