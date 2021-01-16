const localStrategy = require('passport-local').Strategy;
const User = require('../model/user');
const bcrypt = require('bcrypt');

module.exports = passport => {
  passport.use('login',new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (username, password, done) => {
    User.findOne({email: username},async (err, user) => {
      if(err) return done(err);
      if(!user) return done(null, false,{messages: 'invalid email'});
      const validPassword  = await bcrypt.compare(password, user.password)
      if(!validPassword) return done(null, false,{messages : 'Incorect password'});

      return done(null, user)
    })
  }))
  passport.serializeUser((user, done) => {
    done(null, user._id)
  });

  passport.deserializeUser((id, done) => {
    User.findById(id,(err, user) => {
      done(err, user)
    })
  })
}