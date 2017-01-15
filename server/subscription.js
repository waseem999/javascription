const express = require('express');
const router = express.Router();
const models = require('APP/db/models');
const Subscription = models.Subscription;
const User = models.User;
const bodyParser = require('body-parser');
const {mustBeLoggedIn, forbidden,} = require('./auth.filters')

router.get('/', mustBeLoggedIn, forbidden('user not found'), (req, res, next) => Subscription.findOne({
  where: {
    userId: req.session.userId
  }
})
  .then(subscription => {
    res.json(subscription)
  })
  .catch(next));

router.put('/coffees', mustBeLoggedIn, forbidden('user not found'), (req, res, next) => {
  Subscription.addProduct(req.query.data)
    .then(coffees => {
      res.send(coffees);
    })
    .catch(next);
});

router.use('/days', (req, res, next) =>{
req.user.getSubscription()
    .then(subscription => {
      req.subscription = subscription;
      next();
    })
    .catch(next);
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
