// 'use strict'


const express = require('express');
const router = express.Router();

const models = require('APP/db/models');



router.get('/', forbidden('only admins can list users'), function(req, res, next){
	models.User.findAll()
	.then(users => res.json(users))
	.catch(next)
})


router.get('/:id', mustBeLoggedIn, function(req, res, next){
	models.User.findById({
		where: {id: req.params.id},
		include: [{
			model: models.Address
		}]
	})
	.then(user => res.json(user))
	.catch(next);
});

router.post('/', function(req, res, next) {
  models.User.create({
	  name: req.body.name,
	  email: req.body.email,
	  phonenumber: req.body.phonenumber,
	  address: {
		  streetaddress: '',
		  unitnumber: '',
		  city: '',
		  state: '',
		  zipcode: '',
		  country: '',
		  security: false,
		  comments: '',
		  deliverycontactnumber: '',
		  deliverycontactname: '',
		  deliveryaddresstype: 'business'
	  }
  })
    .then(user => res.status(201).json(user))
    .catch(next)
});

router.use('/', function(err, req, res, next) {
  console.log('_____ERROR in the user routes_______ \n');
  res.status(err.status || 500).send(err);
});

module.exports = router;
