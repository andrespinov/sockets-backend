const mongoose = require('mongoose');

var Schema = mongoose.Schema({
  createdAt:{
    type: Date,
    default: Date.now
  },
  name: String,
  posX: Number,
  posY: Number,
  color: String
});

module.exports = mongoose.model('player', Schema);
