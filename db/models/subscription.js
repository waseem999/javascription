'use strict';

const Sequelize = require('sequelize')
const db = require('APP/db')

const subscriptionSchema = {
  frequency: {
    type: Sequelize.ARRAY(Sequelize.BOOLEAN),
    defaultValue: [false, false, false, false, false, false, false],
    validate: {
      len: [7,7]
    }
  },
  time: {
    type: Sequelize.DATE
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}

const Subscription = db.define('subscription', subscriptionSchema, {});

module.exports = Subscription;
