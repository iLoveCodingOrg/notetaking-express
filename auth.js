const passport = require('passport')
const BearerStrategy = require('passport-http-bearer')
const UserModel = require('./users/model')

passport.use(new BearerStrategy(
  function(accessToken, done) {
    UserModel.findOne({ accessToken })
      .then((foundeUser)=>{
        if(foundeUser){
          return done(null, foundeUser)
        }else{
          return done(null, false)
        }
      })
      .catch((err)=>{
        done(err)
      })
  }
))

module.exports = passport