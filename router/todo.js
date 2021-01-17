const router = require('express').Router();
const TodoList = require('../model/todo');
const {todoValidation} = require('../validation/validate');
const auth = require('./verifytoken');

// utils
const getMinDate = () => {
  const minDate = new Date(Date.now());
  const month = () => {
    if(minDate.getMonth() < 9){
      return `0${minDate.getMonth() + 1}`
    }else {
      return `${minDate.getMonth() + 1}`
    }
  }
  const formatedDate = `${minDate.getFullYear()}-${month()}-${minDate.getDate()}T${minDate.toLocaleTimeString()}`;

  return formatedDate;
}

router.get('/',auth,async(req, res) => {
  todos = await TodoList.find({_creator: req.user._id});
  res.render('pages/todolist',{title: 'Todo', user: req.user,todos,formatedDate : getMinDate()});
});

router.post('/add',auth,async (req, res) => {
  const { error } = todoValidation(req.body)
  if(error){
    req.flash('notify',{type: 'warning', message: error.details[0].message});
    return res.redirect('/todo/add');
  }
  const todo = new TodoList({
    judul: req.body.judul,
    _creator: req.user._id,
    deadline: req.body.deadline
  })
  try {
    const newList = await todo.save();
    if(!newList){
      req.flash('notify',{type: 'warning', message:'Gagal menambahkan'});
      return req.redirect('/todo/add');
    }
    
    req.flash('notify',{type: 'success', message:'sukses menambahkan'});
    res.redirect('/todo')
  } catch (error) {
    req.flash('notify',{type: 'warning',message: error.message})
    return res.status(400).redirect('/todo')
  }
})

router.get('/delete/:id',auth,async (req,res) => {
  try {
    const list = await TodoList.findByIdAndDelete(req.params.id);
    if(!list){
      req.flash('notify',{type: 'warning',message:'Gagal menghapus'})
      return res.status(400).redirect('/todo')
    }
    req.flash('notify',{type: 'info',message:'sukses menghapus'})
    return res.redirect('/todo')
  } catch (error) {
    return res.status(400).redirect('/todo')
  }
})
router.get('/update/:id',auth,async (req,res) => {
  try {
    const list = await TodoList.findByIdAndUpdate(req.params.id,{isCompleted: true});
    if(!list){
      req.flash('notify',{type: 'warning',message:'Gagal mengedit'})
      return res.status(400).redirect('/todo')
    }
    req.flash('notify',{type: 'info',message:'sukses mengedit'})
    return res.redirect('/todo')
  } catch (error) {
    return res.status(400).redirect('/todo')
  }
})
module.exports = router;