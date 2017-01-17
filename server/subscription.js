const express = require('express');
const router = express.Router();
const models = require('APP/db/models');
const Subscription = models.Subscription;
const User = models.User;
const bodyParser = require('body-parser');
const {mustBeLoggedIn, forbidden,} = require('./auth.filters')

router.get('/', mustBeLoggedIn, forbidden('user not found'), (req, res, next) => {
  Subscription.findOne({
  where: {
    userId: req.session.userId
  }
})
  .then(subscription => {
    res.json(subscription)
  })
  .catch(next)
});

router.get('/selectedCoffees/:subID', function(req, res, next){
  models.Subscription.findAll({where: {id: req.params.subID}, 
    include: [{model: models.Product}]})
  .then(coffees => {
    res.send(coffees)
  })
  .catch(err => next(err))
})


router.post('/coffees', mustBeLoggedIn, (req, res, next) => {
    models.Subscriptionproduct.destroy({where: {subscription_id: req.user.subscription_id}})
      .then(deletedRows => {
        return models.Subscription.findOne({where: {id: req.user.subscription_id}})
      })
      .then(subscription => {
        return Promise.all(req.body.coffees.map(coffee => {
          subscription.addProducts(coffee.id)
        }))
      })
      .then(newSubscriptions => {
        res.send(newSubscriptions);
      })
      .catch(next);
});

router.put('/coffees', mustBeLoggedIn, (req, res, next) => {
  let coffee = req.body.coffees;
  Subscription.findOne({where: {id:req.user.subscription_id}})
  .then(sub => {
    sub.addProducts(coffee.id)
  })
  .then(coffees => {
    res.send(coffees);
  })
  .catch(next);
});

router.use('/days', (req, res, next) =>{
  if(req.user){
    req.user.getSubscription()
    .then(subscription => {
      req.subscription = subscription;
      next();
    })
    .catch(next);
  }
})

router.put('/days', (req, res, next) => {
    req.subscription.update({frequencyObject: req.body.selecteddays})
    .then(subscription =>
    res.json(subscription))
    .catch(next);
});

router.get('/days', (req, res, next) => {
    res.json(req.subscription)
})


module.exports = router;
