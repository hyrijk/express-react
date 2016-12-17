var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

var Schema = mongoose.Schema
var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    admin: {
      type: Boolean,
      default: false
    }
}, {
    timestamps: true
})

UserSchema.pre('save', function(next) {
    var user = this
    var SALT_FACTOR = 5
    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) return next(err)
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err)
            user.password = hash
            next()
        })
    })
})

UserSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

module.exports = mongoose.model('User', UserSchema);
