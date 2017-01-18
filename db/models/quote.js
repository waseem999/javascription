const Sequelize = require('sequelize')
const db = require('APP/db')

const quoteSchema = {
  
  quote: {
    type: Sequelize.TEXT
  }
}

const Quote = db.define('quote', quoteSchema, {});

module.exports = Quote;