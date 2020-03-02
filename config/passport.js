// config/passport.js
const LocalStrategy = require('passport-local').Strategy

// 載入 User model
const User = require('../models/user')

module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: 'account' }, (account, password, done) => {
      User.findOne({
        account: account
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That account is not registered' })
        }
        if (user.password != password) {
          return done(null, false, { message: 'account or Password incorrect' })
        }
        return done(null, user)
      })
    })
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .exec((err, user) => {
        done(err, user)
      })
  })

}