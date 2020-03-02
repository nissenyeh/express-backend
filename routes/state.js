
const express = require('express')
const router = express.Router()
const { authenticated } = require('../config/auth')
const state = require('../models/state')

var stateId = '5e5c0db1b7d6bc34a1b5bad3'



function message(state){
  const json = {
    enable: '',
    message: ''
  }
  if (state.enable) json.message="網站開啟"; json.enable = state.enable;
  if (!state.enable) json.message="網站關閉"; json.enable = state.enable;

  return json
}

// 獲取網站狀態
router.get('/', (req,res)=>{
  state.find()
  .lean()
  .exec((err,state)=>{
    if(err) return console.error(err)

    json = message(state)
    return res.send(json)
   })
})


// 修改網站狀態
router.post('/', authenticated, (req,res)=>{

  state.findById(stateId, (err, state) => {
    if (err) return console.error(err)
    
    state.enable = !state.enable
    json = message(state)

    state.save(err => {
      if (err) return console.error(err)
      return res.send(json)
      })
  })
})


module.exports = router