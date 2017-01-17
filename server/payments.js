// 'use strict'

const express = require('express');
const router = express.Router();

const stripe = require('stripe')('pk_test_zhNcE7UnOOvuysKTbZ1rcU8A');

router.post('/', function(req, res, next) {
  const token = req.body.card.id;
  const charge = stripe.charges.create({
    amount: 1000,
    currency: 'usd',
    description: 'Example charge',
    source: token,
  }, function(err, charge) {
  });
})

module.exports = router;
