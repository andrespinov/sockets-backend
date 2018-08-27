//Framework Web para NodeJs
const express = require('express');

/**
  *Se requiere /routes.js , recordar que dicho archivo exporta el router
**/
const routes = require('./routes');


/**
 *Se crea servidor express
 */
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(3001);

const sockets = require('./sockets/controller');
const mongoose = require('mongoose');
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

// socket.io connection
io.on('connection', (socket) => {
  console.log("Connected to Socket!!"+ socket.id);
  
  socket.on('addPlayer', (socket) => {
    console.log('socketData: '+JSON.stringify(socket));
    sockets.addPlayer(io,socket);
  });

  /*socket.on('delete', (socket) => {
    console.log('socketData: '+JSON.stringify(socket));
    sockets.deleteSocket(io,socket);
  });*/
})

// connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/haxball-app', { 
  useNewUrlParser: true 
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
    console.log("Estamos corriendo en -->" + app.get('port') + ('✓'));
})
