'use strict'

const express = require('express');
const router = express.Router();
const { User, Address } = require('APP/db/models');

const {mustBeLoggedIn, forbidden,} = require('./auth.filters')

router.get('/', forbidden('only admins can list users'),function(req, res, next) {
  User.findAll()
    .then(users => res.json(users))
    .catch(next)
})

router.post('/', function(req, res, next) {
  User.create(req.body, {include: [{model: Address, as: 'billing_address'}]})
    .then(user => res.status(201).json(user))
    .catch(next)
});

router.get('/:id', mustBeLoggedIn, function(req, res, next) {
  User.findOne({
    where: {id: req.params.id},
    include: [{model: Address, as: 'billing_address'}]
  })
    .then(user => res.json(user))
    .catch(next);
});

router.put('/:id', mustBeLoggedIn, function(req, res, next) {
  User.update(req.body, {where: {id: req.user.id}})
    .then(() => {
      res.json(req.body);
    })
    .catch(next);
});

router.use(function(err, req, res, next) {
  console.log('_____ERROR in the user routes_______ \n');
  res.status(err.status || 500).send(err);
});



module.exports = router;
