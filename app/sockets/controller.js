const Player = require('../models/player');

exports.getPlayers = (req,res) => {
  Player.find().exec((err, players) => {
    if(err){
      res.send(err);
    } else {
      res.send(players);
    }
  });
}

exports.addPlayer = (io,T) => {
  let result;
  var newPlayer = new Player(T);
  newPlayer.markModified('object');
  newPlayer.save((err, player) => {
    if(err){
      result = {'success':false,'message':'Some Error','error':err};
    }
    else{
      result = {'success':true,'message':'Player Added Successfully', player};
      io.emit('PlayerAdded', result);
      console.log('Jugador añadido: ' + player);
    }
  });
}

exports.updatePlayer = (io,T) => {
  let result;
  Player.findOneAndUpdate(T.name, T, { new:true }, (err,player) => {
    console.log('update: ' + player);
    if(err){
      result = {'success':false,'message':'Some Error','error':err};
    }
    else{
      result = {'success':true,'message':'Player Updated Successfully',player};
      io.emit('PlayerUpdated', result);
    }
  });
}

exports.deletePlayer = (io,T) => {
  let result;
  Player.findOneAndDelete(T.name, (err,player) => {
    if(err){
      result = {'success':false,'message':'Some Error','error':err};
    }
    result = {'success':true,'message':'Player deleted successfully', player};
    io.emit('PlayerDeleted', result);
    console.log('Jugador borrado: ' + player);
  })
}
