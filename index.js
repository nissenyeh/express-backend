

const express = require('express');
const app = express()
const mongoose = require('mongoose')                    // 載入 mongoose
const bodyParser = require('body-parser')
const port = 3000


var account = 'admin'
var psd = 'password'
var ip = '3.17.173.21'
var dbPort = '27017'
var dbName = 'todos'
mongoose.connect(`mongodb://${account}:${psd}@${ip}:${dbPort}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection



db.on('error', ()=>{
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

const diagnosis = require('./models/diagnosis')

app.get('/', (req, res) => {
  res.send('hello world!')
})

app.listen(3000, () => {
  console.log('App is running!')
})





// app.use(bodyParser.urlencoded({ extended: true }))

// app.get('/state',(req,res)=>{
//   console.log(req.params.name)
//   const json = { 
//     'enable':false,
//     'message':'網站關閉中'
//   }
//   res.send(json)
// })


// app.get('/data',(req,res)=>{
//   console.log(req.params.name)
//   const json = [{
//     'name': 'ABC',
//     'Date': Date.now(),
//     'DDX-Data': ['心臟病','高血壓','肺癌'],
//     'Q_Text_Data': ['問題1','問題2','問題3','問題4'],
//     'chart_Data': [[1,3],[0,1]],
//      },
//      {
//       'name': 'ABC',
//       'Date': Date.now(),
//       'DDX-Data': ['心臟病','高血壓','肺癌'],
//       'Q_Text_Data': ['問題1','問題2','問題3','問題4'],
//       'chart_Data': [[1,3],[0,1]],
//       }]
//   res.send(json)
// })

// app.post('/data',(req,res)=>{
//   console.log('req.body', req.body)
//   res.send('ok')
// })

// app.post('/login',(req,res)=>{
//   console.log('登入')
//   const { account, password } = req.body
//   console.log(account,password)

//   message ='登入成功'

//   const json = {
//     error:false,
//     message:message
//   }
//   res.send(message)
// })

// app.post('/open',(req,res)=>{
//   console.log('req.body', req.body)
//   console.log(req.body)
//   const { token, open } = req.body
//   var message =''

//   if(open == 'true'){
//     message = '網站開啟'
//   } else if ( open == 'false'){
//     message = '關閉'
//   } else {
//     message = '參數輸入錯誤，可選擇true/ false'
//   }

//   const json = {
//     error:false,
//     message:message
//   }
//   res.send(json)
// })


// app.listen(port, () => {
//   console.log(`Express is running on http://localhost:${port}`)
// })