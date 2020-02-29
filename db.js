
var account = 'admin'
var psd = 'password'
var ip = '3.17.173.21'
var port = '27017'
var db = 'voice'

mongoose.connect(`mongodb://${account}:${psd}@${ip}:${port}/${db}`)

const db = mongoose.connection

export default db;