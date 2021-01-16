const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('pages/index',{title: 'Home',user: req.user});
})


router.get('/login', (req, res) => {
  res.render('pages/login',{title: "Login",user: req.user});
})

router.get('/daftar', (req, res) => {
  res.render('pages/signup', {title:"Daftar", user: req.user})
})

module.exports = router;