'use strict';

const Sequelize = require('sequelize')
const db = require('APP/db')

const tierSchema = {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  costpercup: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  costperpound: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}

const Tier = db.define('tier', tierSchema, {});

module.exports = Tier;
