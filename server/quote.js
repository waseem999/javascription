const express = require('express');
const router = express.Router();
const models = require('APP/db/models');
const Quote = models.Quote;
const User = models.User;



router.get('/', function(req, res, next){
	Quote.findAll({
		include: [User]
	})
	.then(quotes => {
		res.json(quotes)
	})
	.catch(next)
})

module.exports = router;