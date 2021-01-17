const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

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

module.exports = mongoose.model('company', CompanySchema)
