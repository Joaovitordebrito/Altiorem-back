const { insert, fetch } = require('../adapters/mongoose.adapter')

const userController = {
    async register(body) {
        let response
        if(!await fetch('user', {email: body.email})) {
            const query = insert('user', body)
            if(query){
                response = {
                    statusCode: 200,
                    body: {
                      status: 'success',
                      desc: 'Registered successfully'
                    }
                  }
            } else {
                response = {
                    statusCode: 400,
                    body: {
                      status: 'success',
                      desc: 'Register failed'
                    }
                  }
            }
        }else {
            response = {
                statusCode: 400,
                body: {
                  status: 'success',
                  desc: 'user already exists'
                }
              }
        }
        return response
    }
}

module.exports = userController