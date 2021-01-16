const userController = require('../controllers/user.controller.js')
const courseController = require('../controllers/course.controller')

const adapter = {
    async generic (req,res) {
      let fun = req.url.replace('/altiorem.api/', '')
      fun = fun.split('?')[0]
        if (fun.includes('course')) {
            fun = fun.replace('course_', '')
            response = await courseController[fun](req)
            res.status(response.statusCode).json(response.body)
        } else {
            response = await userController[fun](req.body)
            res.status(response.statusCode).json(response.body)
        }
    }
  }
  
module.exports = adapter
