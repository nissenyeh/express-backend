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
  DDX_Data: {
    type: Array,              
    required: true          
  },
  Q_Text_Data:{
    type: Array,              
    required: true              
  },
  chart_Data:{
    type: Array,              
    required: false              
  },
})

module.exports = mongoose.model('diagnosis', diagnosisSchema)


