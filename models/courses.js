const mongoose = require("mongoose")
const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3
  },
  area: {
    type: String,
    required: true,
    min: 3
  },
  content: {
    type: String,
    required: true
  },
  duration: {
    type: String
  },
  description: {
    type: String,
    min: 3
  },
  teacher: {
    type: String,
    min: 3
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
  
})

module.exports = mongoose.model('course', CourseSchema)
