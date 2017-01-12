'use strict'

require('APP/db')
const api = module.exports = require('express').Router()

api
  .get('/heartbeat', (req, res) => res.send({ok: true,}))
  .use('/auth', require('./auth'))
  .use('/subscription', require('./subscription'))
  // .use('/users', require('./users'))

  // .use('/coffee', require('./coffee'))

// Send along any errors
api.use((err, req, res) => {
  res.status(500).send(err)
})

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
