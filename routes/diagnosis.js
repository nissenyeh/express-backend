const express = require('express')
const router = express.Router()
const Diagnosis = require('../models/diagnosis')
const { authenticated } = require('../config/auth')

function jsonResponse(success, message, data){
  const json = {
    success: success,
    message: message,
    data: data ? data: ''
  }
  return json
}

function checkData(item) {

  if(item.name.length === 0) return '請輸入名稱'

  if(item.DDX_Data.length === 0)   return '請輸入疾病'
  if(!Array.isArray(item.DDX_Data))  return '請輸入陣列'
  
  if(item.Q_Text_Data.length === 0) return '請輸入問題'
  if(!Array.isArray(item.Q_Text_Data)) return '請輸入陣列'

  if(item.chart_Data.length === 0) return '請輸入數字陣列'
  if(!Array.isArray(item.chart_Data)) return '請輸入陣列' 

}

// 獲取所有診斷
router.get('/',(req,res)=>{
  Diagnosis.find()
    .lean()
    .exec((err,diagnosis)=>{
      if(err) return console.error(err)
      return res.send(diagnosis)
     })
})

// 新增診斷
router.post('/',(req,res)=>{

  const diagnosisItem = req.body
  if(checkData(diagnosisItem)) jsonResponse(false,checkData(diagnosisItem))

  const diagnosis = new Diagnosis({
    name: diagnosisItem.name,
    Date: Date.now(),
    DDX_Data: diagnosisItem.DDX_Data,
    Q_Text_Data: diagnosisItem.Q_Text_Data
  })

  diagnosis.save((err,data) => {
    if (err) return res.send(jsonResponse(false, '儲存失敗'))
    return res.send(jsonResponse(true, '儲存成功', data))  
  })
})


// 獲取特定的診斷
router.get('/:id', (req,res)=>{
  Diagnosis.findById(req.params.id)
    .lean()
    .exec((err,diagnosis)=>{
      if(err) return console.error(err)
      return res.send(diagnosis)
    })
})

// 修改特定的診斷，只能修改chart_Data
router.post('/:id', authenticated, (req, res) => {
  Diagnosis.findById(req.params.id, (err, Diagnosis) => {

    if(err) return console.error(err) 
    if(!req.body.chart_Data) return res.send(jsonResponse(false,'請輸入chart_Data陣列'))

    Diagnosis.chart_Data = req.body.chart_Data
    Diagnosis.save((err,data) => {
        if (err) return console.error(err)
        return res.send(jsonResponse(true,'修改成功', data))
      })
  })
})


module.exports = router