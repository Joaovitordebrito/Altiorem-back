const { insert, fetch, fetchAll, del, update } = require('../adapters/mongoose.adapter')

const courseController = {
    async company_register(body) {
        console.log(body)
        let response
        if(!await fetch('company', {cnpj: body.cnpj})) {
            const query = insert('company', body)
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
                  desc: 'company already exists'
                }
              }
        }
        return response
    },
    async list_company() {
        let response
        const companies = await fetchAll('company')
        if(companies) {
            response = {
                statusCode: 200,
                body: {
                  status: 'success',
                  desc: companies
                }
              }
        } else {
            response = {
                statusCode: 400,
                body: {
                  status: 'error',
                  desc: 'error fetching companies'
                }
              }
        }
        return response
    },
    async delete_company(body) {
        let response
        const company = await fetch('company', { cnpj: body.cnpj })
        if (company) {
            let query = await del('company', company._id)
            if(query) {
                response = {
                    statusCode: 200,
                    body: {
                      status: 'success',
                      desc: "company updated"
                    }
                  }
            } else {
                response = {
                    statusCode: 200,
                    body: {
                      status: 'success',
                      desc: "error removing the company"
                    }
                  }
            }
        } else {
            response = {
                statusCode: 200,
                body: {
                  status: 'error',
                  desc: "company not found"
                }
              }

        }
        return response
    },
    async update_course(body){
        let response
        const user = await fetch('company', {name: body.name})
        if (user) {
                let query = update('company', body.fields, {name: user.name})
                if (query){
                    response = {
                        statusCode: 200,
                        body: {
                          status: 'success',
                          desc: "company updated"
                        }
                      }
                } else {
                    response = {
                        statusCode: 200,
                        body: {
                          status: 'success',
                          desc: "failed updating company"
                        }
                      }
                }
        }else {
            response = {
                statusCode: 200,
                body: {
                  status: 'success',
                  desc: "company not found"
                }
              }
        }
       return response  
    },
    async company_login(body) {
      let response
      const user = await fetch('company',{ cnpj: body.cnpj })
      if (user){
        if (!await user.compareHash(body.password)) {
         return response = {
            statusCode: 400,
            body: {
              status: 'error',
              desc: 'cnpj or password are wrong'
            }
          }
        }
        const token = await user.generateToken()

        if (token) {
          console.log(token)
          response = {
            statusCode: 200,
            body: { token, id: user.id, cnpj: user.cnpj}
          }
        }
      } else {
        response = {
          statusCode: 400,
          body: {
            status: 'error',
            desc: 'cnpj or password are wrong'
          }
        }
      }
      return response
    }
    
}

module.exports = courseController