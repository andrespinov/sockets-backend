const Player = require('../models/player');

exports.getPlayers = (req,res) => {
  console.log('obtener players')
  Player.find().exec((err, players) => {
    console.log(players)
    if(err){
      res.send({ 
        success: false,
        message: 'Error'
      });
    }
    res.send({ 
      success: true,
      message: 'Enviados correctamente',
      players: players
    });
  });
}

exports.addPlayer = (io,T) => {
  console.log('añadir player')
  let result;
  var newPlayer = new Player(T);
  newPlayer.markModified('object');
  newPlayer.save((err, player) => {
    if(err){
      result = {'success':false,'message':'Some Error','error':err};
    }
    else{
      result = {'success':true,'message':'Todo Added Successfully', player};
      io.emit('PlayerAdded', result);
    }
  });
}
