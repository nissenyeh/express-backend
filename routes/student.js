const express = require('express')
const router = express.Router()
const Student = require('../models/student')
const { authenticated } = require('../config/auth')

function jsonResponse(success, message, data){
  const json = {
    success: success,
    message: message,
    data: data ? data: ''
  }
  return json
}


// 獲取所有學生 : model.find()
router.get('/',(req,res)=>{
  Student.find()
    .lean()
    .exec((err,Student)=>{
      if(err) return console.error(err)
      return res.send(Student)
     })
})

// 新增「學生」 : model.save()
router.post('/',(req,res)=>{

  const studentItem = req.body
  const student = new Student({
    name: studentItem.name,
    mail: studentItem.mail,
    id: studentItem.id
  })

  student.save((err,data) => {
    if (err) return res.send(jsonResponse(false, '儲存失敗'))
    return res.send(jsonResponse(true, '儲存成功', data))  
  })
})


// 獲取特定特定的「學生」: model.findById(id)
router.get('/:id', (req,res)=>{
  Student.findById(req.params.id)
    .lean()
    .exec((err,student)=>{
      if(err) return console.error(err)
      return res.send(student)
    })
})

// 修改特定的學生資料: model.findById(id)   model.save()
router.post('/:id', authenticated, (req, res) => {
  Student.findById(req.params.id, (err, Student) => {

    if(err) return console.error(err) 

    Student.id = req.body.id
    Student.save((err,data) => {
        if (err) return console.error(err)
        return res.send(jsonResponse(true,'修改成功', data))
      })
  })
})


module.exports = router