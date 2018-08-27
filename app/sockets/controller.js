const Player = require('../models/player');

exports.getPlayers = (req,res) => {
  console.log('obtener players')
  Player.find().exec((err, players) => {
    if(err){
      res.send(err);
    } else {
      res.send(players);
    }
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
      result = {'success':true,'message':'Player Added Successfully', player};
      io.emit('PlayerAdded', result);
    }
  });
}

exports.updatePlayer = (io,T) => {
  let result;
  Player.findOneAndUpdate({ _id:T.id }, T, { new:true }, (err,player) => {
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
  Player.findOneAndDelete(T.id, (err,player) => {
    if(err){
      result = {'success':false,'message':'Some Error','error':err};
      console.log(result);
    }
    
    console.log('borrar');
    console.log(player);
    result = {'success':true,'message':'Player deleted successfully', player};
    io.emit('PlayerDeleted', result);
  })
}
