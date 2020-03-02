const mongoose = require('mongoose')
const diagnosis = require('../class')

mongoose.connect('mongodb://127.0.0.1/class',{userNewUrlParser:true})

const db = mongoose.connection


db.on('error',()=>{
  console.log('db error')
})

db.once('open',()=>{
  console.log('db connected!')

  for(var i=0;i<10;i++){
    student.create(
    {
      name:'name-' + i,
      id:'comment-' + i,
      email: i+'@gmail.com'
    })
  }
  console.log('done')
})