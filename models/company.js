const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const rand_token = require('rand-token')

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3
  },
  address: {
    type: String,
    required: true,
    min: 3
  },
  cnpj: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  jobs: {
    type: Array
  },
  password: {
    type: String,
    min: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

CompanySchema.pre('save', async function hashPassword(next) {
    if (!this.isModified('password')) {
      next()
    }
    this.password = await bcrypt.hash(this.password, 8)
  })

CompanySchema.methods = {
    async compareHash(hash) {
      return await bcrypt.compare(hash, this.password)
    },
  
    generateToken() {
      let obj = { id: this.id, cnpj: this.cnpj, refresh: rand_token.uid(20) }

      return jwt.sign(obj, process.env.SECRET_SESSION_TOKEN, {
        expiresIn: this.developer ? '2 days' : '4h'
      })
    }
  }
module.exports = mongoose.model('company', CompanySchema)
