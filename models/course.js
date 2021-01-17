const mongoose = require("mongoose")
const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 3
  },
  image: {
    type: String,
    required: true,
    min: 3
  },
  source: {
    type: String,
    required: true
  },
  workload: {
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
  modules:{
    type: Array
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('course', CourseSchema)
