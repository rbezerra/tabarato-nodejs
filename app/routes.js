var express = require('express');
var config = require('../config/main');
var jwt = require('jsonwebtoken');

var Item = require('./models/item');

module.exports = function(app){
  var apiRoutes = express.Router();

  apiRoutes.post('/item', function(req,res){
    var item = new Item();
    item.nome = req.body.nome;
    item.descricao = req.body.descricao;
    item.categoria = req.body.categoria;
    item.preco = req.body.preco;
    item.loc.nome = req.body.loc.nome;
    item.loc.latlon = req.body.loc.latlon;

    item.save(function(err){
      if(err) res.send(err);
      res.json({message: 'Item Adiconado!'});
    });
  });

  apiRoutes.get('/item', function(req, res){
    Item.find({}, function(err,messages){
      if(err) res.send(err);
      res.json(messages);
    })
  });

  apiRoutes.get('/item/:item_id', function(req, res){
    Item.find({'_id':req.params.item_id}, function(err,messages){
      if(err) res.send(err);
      res.json(messages);
    })
  });

  apiRoutes.put('/item/:item_id', function(req, res){
    Item.findOne({'_id': req.params.item_id}, function(err, message){
      if(err) res.send(err);
      message.nome = req.body.nome;
      message.descricao = req.body.descricao;
      message.categoria = req.body.categoria;
      message.preco = req.body.preco;
      message.loc.nome = req.body.loc.nome;
      message.loc.latlon = req.body.loc.latlon;

      message.save(function(err){
        if(err) res.send(err);
        res.json({message: 'Item editado'});
      });
    })
  });

  apiRoutes.delete('/item/:item_id', function(req, res){
    Item.findOneAndRemove({'_id':req.params.item_id}, function(err){
      if(err) res.send(err);
      res.json('Item Removido');
    })
  });

  app.use('/api', apiRoutes);
}
