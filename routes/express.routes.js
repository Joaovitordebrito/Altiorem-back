const express = require('express')
const adapter = require('../adapters/express.adapter')
const routes = express.Router()
//user routes
routes.post('/altiorem.api/register', adapter.generic)
routes.post('/altiorem.api/login', adapter.generic)


//course routes
routes.post('/altiorem.api/course_register', adapter.generic)
routes.post('/altiorem.api/list_course', adapter.generic)
routes.post('/altiorem.api/delete_course', adapter.generic)
routes.post('/altiorem.api/update_course', adapter.generic)


//company routes
routes.post('/altiorem.api/company_register', adapter.generic)
routes.post('/altiorem.api/list_company', adapter.generic)
routes.post('/altiorem.api/delete_company', adapter.generic)
routes.post('/altiorem.api/list_company_courses', adapter.generic)
routes.post('/altiorem.api/company_login', adapter.generic)
routes.post('/altiorem.api/list_company_jobs', adapter.generic)

routes.post('/altiorem.api/dialog', adapter.generic)
module.exports = routes