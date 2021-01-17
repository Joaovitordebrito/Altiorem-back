const userController = require('../controllers/user.controller.js')
const courseController = require('../controllers/course.controller')
const companyController = require('../controllers/company.controller')
const chatBotController = require('../controllers/chatbot.controller')

const adapter = {
    async generic (req,res) {
      let fun = req.url.replace('/altiorem.api/', '')
      fun = fun.split('?')[0]
        if (fun.includes('course')) {
          response = await courseController[fun](req.body)
          res.status(response.statusCode).json(response.body)
        } else if (fun.includes('company')) {
          response = await companyController[fun](req.body)
          res.status(response.statusCode).json(response.body)
        } else if (fun.includes('dialog')) {
          response = await chatBotController[fun](req.body)
          res.status(response.statusCode).json(response.body)
        } else {
          response = await userController[fun](req.body)
          res.status(response.statusCode).json(response.body)
        }
    }
  }
  
module.exports = adapter
