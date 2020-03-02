const mongoose = require('mongoose')
const Schema = mongoose.Schema

const diagnosisSchema = new Schema({
  name: { //學生名稱
    type: String,              
    required: true          
  }, 
  Date: { //日期
    type: Date,              
    required: true          
  },
  id: {
    type: String,              
    required: true          
  },
  email: {
    type: String,              
    required: true          
  },
})

module.exports = mongoose.model('diagnosis', diagnosisSchema)


