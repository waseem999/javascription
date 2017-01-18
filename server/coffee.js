
const express = require('express');
const router = express.Router();
const models = require('APP/db/models');


router.get('/singleCoffee/:coffeeID', function(req, res, next) {
  return models.Product.findById(req.params.coffeeID)
    .then((coffee) => {
      res.json(coffee);
    })
    .catch(next);
})

router.post('/new', function(req, res, next) {
  const coffeeData = req.body.data;
  models.Product.create(coffeeData)
    .then(success => {
      res.send(success);
    })
    .catch(next);
})


router.get('/all', function(req, res, next) {
  models.Product.findAll()
    .then(coffees => {
      res.send(coffees);
    })
    .catch(next);
})

router.get('/all/:userID', function(req, res, next) {
  models.Product.findAll({
    include: [{
      model: models.Subscription,
      include: [{model: models.User, where: {id: req.params.userID}}]
    }],
  })
    .then(coffees => {
      res.send(coffees)
    })
    .catch(next);
})


router.get('/:tier', function(req, res, next) {
  models.Product.findAll({
    include: [{
      model: models.Tier,
      where: {tier: req.params.tier}
    }]
  })
    .then(coffees => {
      res.send(coffees);
    })
    .catch(next);
})

router.use('/', function(err, req, res, next) {
  console.log('_______ERROR from coffee server routes______ \n');
  res.status(err.status || 500).send(err);
})

module.exports = router;

