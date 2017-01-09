'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user');
const Product = require('./product');
const Address = require('./address');
const Subscription = require('./subscription');
const Tier = require('./tier');
const Subscriptionproduct = require('./subscriptionproduct');

User.belongsToMany(Product, {as: 'favorite'});
Product.belongsToMany(User, {as: 'favoriter'});
Subscription.belongsToMany(Product, {through: Subscriptionproduct});
Product.belongsToMany(Subscription, {through: Subscriptionproduct});
Subscription.belongsTo(Address);
User.belongsTo(Address);
Address.hasMany(User);
Address.hasMany(Subscription);
Product.belongsTo(Tier);
Tier.hasMany(Product);
User.belongsTo(Subscription);
Subscription.belongsTo(User)



module.exports = {User, Product, Address, Subscription, Tier}
