// routes/user.js
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')               // 載入 passport


function message(success, message){
  const json = {
    success: success,
    message: message
  }
  return json
}


// 登入帳號
router.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) { console.log(err) ;return next(err); }
    if (!user) { return res.send(message(false,'帳號或密碼錯誤'))}

    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send(message(true,'登錄成功'));
    });

  })(req, res, next);
})

// 註冊帳號
router.post('/register', (req, res) => {
  const { account, password } = req.body
  User.findOne({ account: account }).then(user => {
    if (user) {                                       // 檢查 email 是否存在

      const json = message(false,'帳號已經註冊')
      res.send(json)     

    } else {
      const newUser = new User({    // 如果 email 不存在就直接新增
        account, password
      })
      newUser.save()
        .then(user => {
          const json = message(true,'註冊成功')
          res.send(json)                      // 新增完成導回首頁
        })
        .catch(err => console.log(err))      
    }
  })
})

// 登出
router.get('/logout', (req, res) => {
  req.logout()
  res.send(message(true,'登出成功'))          
})

module.exports = router