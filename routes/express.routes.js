const express = require('express')
const adapter = require('../adapters/express.adapter')
const routes = express.Router()
//user routes
routes.post('/altiorem.api/register', adapter.generic)


//course routes
routes.post('/altiorem.api/course_register', adapter.generic)
routes.post('/altiorem.api/list_course', adapter.generic)
routes.post('/altiorem.api/delete_course', adapter.generic)
routes.post('/altiorem.api/update_course', adapter.generic)

module.exports = routes