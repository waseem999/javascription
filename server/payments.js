// // 'use strict'

// const express = require('express');
// const router = express.Router();

// var stripe = require("stripe")("pk_test_zhNcE7UnOOvuysKTbZ1rcU8A");

// router.post('/', function(req, res, next) {
// let token = req.body.stripeToken; 
// console.log("TOKEN???", token)
// var charge = stripe.charges.create({
//   amount: 1000,
//   currency: "usd",
//   description: "Example charge",
//   source: token,
// }, function(err, charge) {
//   // asynchronously called
// });
// })