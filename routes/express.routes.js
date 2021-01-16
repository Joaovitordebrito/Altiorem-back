const express = require('express')
const adapter = require('../adapters/express.adapter')
const routes = express.Router()

routes.post('/user/register', adapter.generic)

module.exports = routes