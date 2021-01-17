const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const rand_token = require('rand-token')

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

UserSchema.methods = {
  async compareHash(hash) {
    return await bcrypt.compare(hash, this.password)
  },

  generateToken() {
    let obj = { id: this.id, email: this.email, refresh: rand_token.uid(20) }

    return jwt.sign(obj, process.env.SECRET_SESSION_TOKEN, {
      expiresIn: this.developer ? '2 days' : '4h'
    })
  }
}

module.exports = mongoose.model('user', UserSchema)
