// const Express = require('express');

// const router = Express.router();
// const db = require('APP/db/models/index.js')
// const User = db.model('users')

// router.post('/new', function(req, res, next){
//     let coffeeData = req.body.data;
//     db.Product.create(coffeeData)
//     .then(success => {
//         res.send(success);
//     })
//     .catch(next);
// })

// router.get('/:coffeeID', function(req, res, next){
//     db.Product.findOne({where: {id: req.params.coffeeID}})
//     .then(coffee => {
//         res.send(coffee);
//     })
//     .catch(next);
// })

// router.get('/all', function(req, res, next){
//     db.Product.findAll()
//     .then(coffees => {
//         res.send(coffees);
//     })
//     .catch(next);
// })

// router.get('/all/:userID', function(req, res, next){
//     db.Product.findAll({
//         include: [{
//             model: db.Subscription,
//             include: [{model: db.User, where: {id: req.params.userID}}]
//         }],
//     })
//     .then(coffees => {
//         res.send(coffees)
//     })
//     .catch(next);
// })

// router.get('/:tier', function(req, res, next){
//     db.Product.findAll({
//         include: [{
//             model: db.Tier,
//             where: {tier: req.params.tier}
//         }]
//     })
//     .then(coffees => {
//         res.send(coffees);
//     })
//     .catch(next);
// })

// router.use('/', function(err, req, res, next){
//     console.log("_______ERROR from coffee server routes______ \n");
//     res.status(err.status || 500).send(err);
// })

// module.exports = router;