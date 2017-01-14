'use strict';

const Sequelize = require('sequelize')
const db = require('APP/db')

const addressSchema = {
  street_address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  unit_number: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zipcode: {
    type: Sequelize.STRING,
    allowNull: false
  },
  country: {
    type: Sequelize.STRING,
    defaultValue: 'USA'
  },
  security: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  comments: {
    type: Sequelize.TEXT
  },
  delivery_contact_number: {
    type: Sequelize.STRING
  },
  delivery_contact_name: {
    type: Sequelize.STRING
  },
  delivery_address_type: {
    type: Sequelize.ENUM('home', 'business')
  }
}

const Address = db.define('address', addressSchema, {});

module.exports = Address;
