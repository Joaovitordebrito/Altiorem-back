const { insert, fetch } = require('../adapters/mongoose.adapter')

const courseController = {
    async course_register(body) {
        let response
        if(!await fetch('course', {name: body.name})) {
            const query = insert('course', body)
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
                  desc: 'course already exists'
                }
              }
        }
        return response
    }
}

module.exports = courseController