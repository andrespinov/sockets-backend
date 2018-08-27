/**
 *Se crea un nuevo router que va a contener las rutas de todos los modelos.
**/
const Router = require('express').Router;
const router = new Router();
const config = require('./config/config');
/**
 * Rustas---> Index
 **/
router.route('/ping').get((req, res) => {
    res.send('Pong').status(200);
});

/**
  * Se hace llamados a los routes de los modelos
  * y se le asigna un nombre a cada recurso(Recomendacion:Mismo nombre del modelo)
**/
const player = require('./sockets/route');
router.use('/api', player);


/**
  * Exportamos modelos, este esta implementado en app.js
**/
module.exports = router;
