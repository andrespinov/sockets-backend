//Framework Web para NodeJs
const express = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);

/**
  *Chalk es usada para colorear la consola.
**/
const chalk = require('chalk');

/**
  *Se requiere /routes.js , recordar que dicho archivo exporta el router
**/
const routes = require('./routes');


/**
 *Se crea servidor express
 */
const app = express();
/**
 * Se hace llamado a nuestras exportaciones.
 *  /config/express esta haciendo un llamado a la funcion /config/express.js
 *  Dicha funcion recibe un parametro el cual debe ser una intancia de express  ,por lo cual tiene sentido
 *  enviar nuestra 'app' para que se ejecute en el metodo.
 * ____________________________________________________________
 * Nota: require('./config/express')(app); ,realmente lo que esta haciendo es
 * funcion(app){
 ....
 ....
}
 */
require('./config/express')(app);

/**
  *Se hace el uso de las rutas definidas en /routes.js
**/
app.use(routes);

/**
 * Conexón con el socket
 */

io.on('connection', function(socket){
  console.log('user connected');
  socket.on('disconnect', function(){
    console.log('user disconected');
  });
});

/**
  * La aplicacion hasta ahora, este configurada(Express) y
  * tenemos rutas asignadas, carpetas estaticas y modelos
  * muy livianos.
  *
  * El comando app.listen(port,callback), es quien levanta nuestro servidor en
  * el puerto  app.get('port'),recordar que este lo asginamos en /config/express.js
  * La funcion contenida sola
**/
app.listen(app.get('port'), () => {
    console.log("Estamos corriendo en -->" + app.get('port')+ chalk.green('✓'));
})
