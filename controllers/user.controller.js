const { insert, fetch } = require('../adapters/mongoose.adapter')

const userController = {
    async register(body) {
        let response
        if(!await fetch('user', {email: body.email})) {
            const query = insert('user', body)
            if(!query){
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
                      status: 'error',
                      desc: 'Register failed'
                    }
                  }
            }
        }else {
            response = {
                statusCode: 400,
                body: {
                  status: 'error',
                  desc: 'user already exists'
                }
              }
        }
        return response
    },
    async login(body) {
      let response
      const user = await fetch('user',{ email: body.email })
      if (user){
        if (!await user.compareHash(body.password)) {
         return response = {
            statusCode: 400,
            body: {
              status: 'error',
              desc: 'user or password are wrong'
            }
          }
        }
        const token = await user.generateToken()

        if (token) {
          console.log(token)
          response = {
            statusCode: 200,
            body: { token, id: user.id, email: user.email}
          }
        }
      } else {
        response = {
          statusCode: 400,
          body: {
            status: 'error',
            desc: 'user or password are wrong'
          }
        }
      }
      return response
    }
}

module.exports = userController