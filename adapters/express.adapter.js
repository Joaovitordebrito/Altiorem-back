const userController = require('../controllers/user.controller.js')

const adapter = {
    async generic (req,res) {
      let fun = req.url.replace('/user/', '')
      fun = fun.split('?')[0]
        response = await userController[fun](req.body)
        res.status(response.statusCode).json(response.body)

    }
  }
  
module.exports = adapter
