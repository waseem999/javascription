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

User.belongsToMany(Product, {as: 'favorite', through: 'favorite'});
Product.belongsToMany(User, {as: 'favoriter', through: 'favorite'});
Subscription.belongsToMany(Product, {through: Subscriptionproduct});
Product.belongsToMany(Subscription, {through: Subscriptionproduct});

User.belongsTo(Address, {as: 'billing_address', allowNull: false});
Subscription.belongsTo(Address, {as: 'delivery_address'});

Product.belongsTo(Tier);
Tier.hasMany(Product);

User.belongsTo(Subscription);
Subscription.hasMany(User);

module.exports = {User, Product, Address, Subscription, Tier}
