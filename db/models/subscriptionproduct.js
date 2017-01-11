'use strict';

const Sequelize = require('sequelize')
const db = require('APP/db')

const subscriptionproductSchema = {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
};

const Subscriptionproduct = db.define('Subscriptionproduct', subscriptionproductSchema, {});

module.exports = Subscriptionproduct;
