require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport')
const mongoStore = require('connect-mongo')(session);
const flash = require('express-flash-messages');
const ExLayouts = require('express-ejs-layouts');
const PORT = process.env.PORT || 5000;
const app = express();


// coonect db
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify: false}, () => console.log('Database connected'))
app.use(session({
  secret: 'todolist',
  resave: false,
  saveUninitialized: false,
  store: new mongoStore({mongooseConnection: mongoose.connection})
}));

require('./passport/config')(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine','ejs');
app.use(flash());
app.use(ExLayouts);
// router
const homeRouter = require('./router');
const userRouter = require('./router/user');
const todo = require('./router/todo');
app.use('/',homeRouter);
app.use('/user',userRouter);
app.use('/todo',todo);



app.listen(PORT, () => console.log('server running on port: ' + PORT))
