const mongoose = require('mongoose');

var Schema = mongoose.Schema({
  createdAt:{
    type: Date,
    default: Date.now
  },
  playerText: String,
  playerDesc: String
});

module.exports = mongoose.model('player', Schema);
