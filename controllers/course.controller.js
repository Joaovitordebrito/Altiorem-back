const { insert, fetch, fetchAll, fetchMany, del, update } = require('../adapters/mongoose.adapter')
const { list_company } = require('./company.controller')

const courseController = {
    async course_register(body) {
        let response
        const user = await fetch('course', {title: body.title})
        if(!user) {
            const source = await fetch('company', {cnpj: body.source})
            if(source){
                body.source = source.name
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
                      desc: 'company not found'
                    }
                  }
            }
        } else {
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
        const course = await fetchMany('course', { title: body.title })
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
        const user = await fetch('course', {title: body.title})
        if (user) {
                let query = update('course', body.fields, {title: user.title})
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
    },
    async list_company_courses(body) {
        let response
        const courses = await fetchMany('course', {source: body.source})
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
    }
    
}

module.exports = courseController