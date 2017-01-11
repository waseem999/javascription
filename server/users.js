'use strict'

const Express = require('express');
const router = Express.Router();
const models = require('APP/db/models');

const {mustBeLoggedIn, forbidden,} = require('./auth.filters')

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

router.post('/', function(req, res, next){
	models.User.create(req.body)
	.then(user => res.status(201).json(user))
	.catch(next)
});


router.use('/', function(err, req, res, next){
	console.log("_____ERROR in the user routes_______ \n");
	res.status(err.status || 500).send(err);
});

module.exports = router;


	
