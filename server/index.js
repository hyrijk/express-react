var express = require('express')
var app = express()
var port = require('./config').port
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
mongoose.connect('mongodb://localhost:27017/react-hand-in-hand')
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('connection failed!', err);
})

db.once('open', function() {
  var user = new User({
    username: 'xiaohong',
    password: '123456'
  })
  user.save();
})

app.get('/api', function(req, res) {
  res.send('Welcome to here!')
})
app.listen(port, function() {
  console.log('Express server is listening on port 4000')
})
