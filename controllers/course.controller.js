const { insert, fetch, fetchAll, del, update } = require('../adapters/mongoose.adapter')

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
                  desc: 'course already exists'
                }
              }
        }
        return response
    },
    async list_course() {
        let response
        const courses = await fetchAll('course')
        if(courses) {
            response = {
                statusCode: 200,
                body: {
                  status: 'success',
                  desc: courses
                }
              }
        } else {
            response = {
                statusCode: 400,
                body: {
                  status: 'error',
                  desc: 'error fetching courses'
                }
              }
        }
        return response
    },
    async delete_course(body) {
        let response
        const course = await fetch('course', { name: body.name })
        if (course) {
            let query = await del('course', course._id)
            if(query) {
                response = {
                    statusCode: 200,
                    body: {
                      status: 'success',
                      desc: "course updated"
                    }
                  }
            } else {
                response = {
                    statusCode: 200,
                    body: {
                      status: 'success',
                      desc: "error removing the course"
                    }
                  }
            }
        } else {
            response = {
                statusCode: 200,
                body: {
                  status: 'error',
                  desc: "course not found"
                }
              }

        }
        return response
    },
    async update_course(body){
        let response
        const user = await fetch('course', {name: body.name})
        if (user) {
                let query = update('course', body.fields, {name: user.name})
                if (query){
                    response = {
                        statusCode: 200,
                        body: {
                          status: 'success',
                          desc: "course updated"
                        }
                      }
                } else {
                    response = {
                        statusCode: 200,
                        body: {
                          status: 'success',
                          desc: "failed updating course"
                        }
                      }
                }
        }else {
            response = {
                statusCode: 200,
                body: {
                  status: 'success',
                  desc: "course not found"
                }
              }
        }
       return response  
    }
    
}

module.exports = courseController