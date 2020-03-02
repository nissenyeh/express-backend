const express = require('express');
const app = express()
const mongoose = require('mongoose')                    // 載入 mongoose

const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')

mongoose.connect('mongodb://localhost/student',{ useNewUrlParser: true,useUnifiedTopology: true })   // 設定連線到 mongoDB

const db = mongoose.connection

app.use(bodyParser.json());

db.on('error', ()=>{
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})


app.use(session({
  secret: 'your secret key',   // secret: 定義一組屬於你的字串做為私鑰
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)

app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})


app.use('/user', require('./routes/user'))
app.use('/student', require('./routes/student'))


app.get('/',(req,res)=>{
  res.send('登陸成功')
})

app.listen('3000', () => {
  console.log(`Express is running on http://localhost:3000`)
})