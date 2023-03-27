const passport = require("passport")
const localStrategy = require("passport-local").Strategy
const User = require("../models/User")

passport.initialize()

passport.use(new localStrategy(
  async function (username, password, done){

    const user = await User.findOne({
      where : {
        codePersoneli : username
      }
    })

    try {

      if(!user) return done(null, false, { message : "نام کاربری و یا کلمه عبور اشتباه است" })

      if(password !== "admin") return done(null, false, { message : "نام کاربری و یا کلمه عبور اشتباه است" })
      
      if(user.userRank != "مدیر" && user.userRank != "توسعه دهنده") return done(null, false, {message : "شما دسترسی به این بخش از سایت را ندارید"})

      return done(null, user)
      
    } catch (error) {
      done(error)
    }

  }
))

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findByPk(id)
    done(null, user)
  } catch (error) {
    done(error, null)
  }
})