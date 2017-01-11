'use strict';

const Sequelize = require('sequelize')
const db = require('APP/db')

const productSchema = {
  roast: Sequelize.STRING,
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  region: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING(1000),
    allowNull: false
  },
  photo: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  }
};

const productConfig = {};

const Product = db.define('product', productSchema, productConfig);

module.exports = Product;
