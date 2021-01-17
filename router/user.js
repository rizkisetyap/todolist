const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const {loginValidation, registerValidation} = require('../validation/validate');
const verify = require('./verifytoken');
const bcrypt = require('bcrypt');
const passport = require('passport');


router.post('/login',(req, res, next) => {
  passport.authenticate('login',(err, user,info) => {
    if(err) return next(err);
    if(!user){
      req.flash('notify',{type: 'warning', message: "email / password salah"});   
      return res.redirect('/login')
    }
    req.logIn(user, err => {
      if(err) return next(err)
      req.flash('notify',{type: 'success',message: 'login sukses'})
      return res.redirect('/todo')
    })
  })(req, res, next)
})

router.post('/daftar', async(req, res) => {
  const { error } = registerValidation(req.body);
  const emailExist = await User.findOne({ email: req.body.email });

  if(error) {
    req.flash('notify',{type:'warning', message: error.details[0].message});
    return res.redirect('/daftar');
  }
  if(emailExist){
    req.flash('notify',{type:'warning', message: 'email sudah digunkan'});
    return res.redirect('/daftar');
  };

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt); 
    const user = new User({...req.body,password : hashedPassword});
    const savedUser = await user.save();

    req.flash('notify',{type:'success',message:'Akun berhasil dibuat'})
    res.redirect('/login');
  } catch (err) {
    req.flash('notify',{type:'danger', message: 'internal server error'})
    res.redirect('/login')
  }
  
})
// user login
router.get('/logout', (req, res) => {
  try {
    req.logOut();
    req.flash('notify',{type: 'success', message: 'Log out sukses'})
    res.redirect('/login')
  } catch (error) {
    res.status(400).redirect('/')
  }
})



module.exports = router;