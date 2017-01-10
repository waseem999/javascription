const express = require('express');
const router = express.Router();
const models = require('APP/db/models');
const Subscription = models.Subscription;
const User = models.User;
const bodyParser = require('body-parser');



router.get('/', (req, res, next) => {
  return Subscription.findOne({ 
      where: { 
        userId: req.session.userId
      }
    })
    .then(subscription => {
      res.json(subscription)
    })
    .catch(next);
});

router.put('/', (req, res, next) => {
   Subscription.findOne({
       where : {
         userId : req.session.userId
       }
     })
     .then(subscription => {
       subscription.update({frequency : req.body.dayselected})
     })
     .catch(next);
});
