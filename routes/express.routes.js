const express = require('express')
const adapter = require('../adapters/express.adapter')
const routes = express.Router()

routes.post('/altiorem.api/register', adapter.generic)
routes.post('/altiorem.api/course_register', adapter.generic)

module.exports = routes