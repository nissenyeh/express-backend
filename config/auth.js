module.exports = {
  authenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.send({message:'請登錄帳號'})
  }
}