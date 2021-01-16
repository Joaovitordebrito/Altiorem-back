const mongoose = require("mongoose")
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
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('company', CompanySchema)
