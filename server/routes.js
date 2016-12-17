const User = require('./models/user')
const jwt = require('jsonwebtoken')
const secret = require('./config').secret
const Post = require('./models/post')
var multer = require('multer')

let upload = multer({dest: 'public/uploads/posts'})

function generateToken(user) {
  return jwt.sign(user, secret, {
    expiresIn: 3000
  })
}

function requiredAuth(req, res, next) {
  let token = req.headers.authorization
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      console.log(decoded, err)
      if (err) {
        if (err.name == 'TokenExpiredError') {
          return res.status(401).json({error: '认证码失效, 请重新登录!'})
        } else {
          return res.status(401).json({error: '认证失败!'})
        }
      }
      if (decoded.admin == true) {
        next()
      } else {
        res.status(401).json({error: '认证失败!'})
      }
    })
  } else {
    return res.status(403).json({error: '请提供认证码!'})
  }
}

module.exports = function(app) {
    app.post('/auth/login', (req, res) => {
        User.findOne({
            username: req.body.username
        }, (err, user) => {
            if (err) return console.log(err)
            if (!user) return res.status(403).json({
                error: '用户名不对'
            })
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (err) return console.log(err)
                if (!isMatch) return res.status(403).json({
                    error: '密码不正确'
                })
                return res.json({
                    token: generateToken({name: user.username, admin: user.admin}),
                    user: {
                        username: user.username,
                        admin: user.admin
                    }
                })
            })
        })
    })

    app.post('/auth/signup', function(req, res) {
      let user = new User()
      user.username = req.body.username
      user.password = req.body.password
      user.save(function(err) {
        if (err) return console.log(err)
        return res.json({
          token: generateToken({name: user.username}),
          user: {
            username: user.username
          }
        })
      })
    })

    app.post('/posts', requiredAuth, upload.single('post'), (req, res) => {
      let post = new Post()
      if (req.file && req.file.filename) {
        post.cover = req.file.filename
      }
      post.name = req.body.name
      post.content = req.body.content
      post.save(err => {
        if (err) return console.log(err)
        res.json({
          post: post,
          message: '文章创建成功了!'
        })
      })
    })

    app.get('/posts', function(req, res) {
      Post.find({}, 'name cover', function(err, posts) {
        if (err) return console.log(err);
        res.json({
          posts: posts,
          message: '获取所有文章成功了！'
        });
      })
    })

    app.get('/posts/:post_id', function(req, res) {
      Post.findById({_id: req.params.post_id}, function(err, post) {
        if (err) return res.status(422).json({error: err.message})
        res.json({post: post})
      })
    })

    app.put('/posts/:post_id',requiredAuth, upload.single('post'), function(req, res) {
      Post.findById({_id: req.params.post_id}, function(err, post) {
        if (err) return res.status(422).json({error: err.message})
        post.name = req.body.name
        post.content = req.body.content
        console.log(post)
        if (req.file && req.file.filename) {
          post.cover = req.file.filename
        }
        post.save(function(err) {
          if (err) return res.status(422).json({error: err.message})
          console.log(post)
          res.json({
            post: post,
            message: '文章更新成功了!'
          })
        })
      })
    })

    app.delete('/posts/:post_id',requiredAuth, function(req, res) {
      let id = req.params.post_id
      Post.findById({_id: id}, function(err, post) {
        post.remove(function(err) {
          if (err) return res.status(422).json({error: err.message})
          res.json({
            id: id,
            message: '文章已经移除了'
          })
        })
      })
    })
}
