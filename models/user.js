const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3
  },
  email: {
    type: String,
    required: true,
    min: 3
  },
  phone: {
    type: String,
    required: true
  },
  document: {
    type: String
  },
  address: {
    type: String,
    min: 3
  },
  password: {
    type: String,
    min: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  blocked: {
    type: Boolean,
    default: false
  }
})
UserSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) {
    next()
  }
  this.password = await bcrypt.hash(this.password, 8)
})

module.exports = mongoose.model('user', UserSchema)
