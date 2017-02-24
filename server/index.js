var express = require('express')
var app = express()
var config = require('./config')
var mongoose = require('mongoose')
var User = require('./models/user')
var bodyParser = require('body-parser')
var routers = require('./routes')
var morgan = require('morgan')
var cors = require('cors')
var path = require('path')

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

routers(app)
var { host, port, database } = config.mongodb
mongoose.connect(`mongodb://${host}:{port}/${database}`)
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('connection failed!', err);
})

app.get('/api', function(req, res) {
  res.send('Welcome to here!')
})
app.listen(config.port, function() {
  console.log('Express server is listening on port 4000')
})
