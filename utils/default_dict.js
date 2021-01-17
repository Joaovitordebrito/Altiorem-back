const { update } = require('../adapters/mongoose.adapter')
module.exports = {
  'Qual seu nome?': (answer, uid) => {
    update('user', { name: answer }, { uid })
  },
  'Qual o seu pronome?': (answer, uid) => {
    update('user', { pronouns: answer }, { uid })
  },
  'Qual seu e-mail?': (answer, uid) => {
    update('user', { email: answer }, { uid })
  },
  'Onde você mora?': (answer, uid) => {
    update('user', { address: answer }, { uid })
  },
  'Qual seu número de telefone?': (answer, uid) => {
    update('user', { phone: answer }, { uid })
  },
  'Você cursa faculdade?': (answer, uid) => {
    update('user', { college: answer }, { uid })
  },
  'Qual seu curso?': (answer, uid) => {
    update('user', { college: answer }, { uid })
  },
  'Quais são seus interesses?': (answer, uid) => {
    update('user', { interests: answer.replace(/\s/g, '').split(',') }, { uid })
  },
}