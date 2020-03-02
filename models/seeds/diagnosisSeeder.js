const mongoose = require('mongoose')
const diagnosis = require('../diagnosis')

mongoose.connect('mongodb://127.0.0.1/diagnosis',{userNewUrlParser:true})

const db = mongoose.connection


db.on('error',()=>{
  console.log('db error')
})

db.once('open',()=>{
  console.log('db connected!')
  for(var i=0;i<10;i++){
    diagnosis.create(
      {name:'name-'+i,
       Date: i,
       DDXData:[i,i,i],
       Q_Text_Data:[i,i,i],
       chart_Data:[[i,i],[i,i]]
      })
  }
  console.log('done')
})