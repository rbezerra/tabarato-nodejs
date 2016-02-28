var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
  nome:{
    type: String,
    required: true
  },
  descricao: {
    type: String
  },
  categoria:{
    type:[String]
  },
  preco:{
    type: Number,
    min: 0,
    required: true
  },
  created_at: {
    type: Date,
    required: true
  },
  updated_at:{
    type: Date
  },
  loc:{
    nome: String,
    latlon: {
      type: [Number],
      index: '2d',
      required: true
    }
  }
});

ItemSchema.pre('save', function(next){
  var now = new Date();
  this.updated_at = now;
  if(!this.created_at){
    this.created_at = now;
  }
  next();
});

module.exports = mongoose.model('Item', ItemSchema);

