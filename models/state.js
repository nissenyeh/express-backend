const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stateSchema = new Schema({
  enable: { //學生名稱
    type: Boolean,              
    required: true          
  }, 
})

module.exports = mongoose.model('state', stateSchema)
