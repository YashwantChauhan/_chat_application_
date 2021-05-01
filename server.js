'use strict';

const SESSION_SECRET = 'yashwant';

const pug  = require('pug')
const express = require('express');
const myDB = require('./connection');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const session = require('express-session')
const passport = require('passport')

const app = express();

fccTesting(app); //For FCC testing purposes
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret : SESSION_SECRET,
  resave : true,
  saveUninitialized : true,
  cookie : {
    secure : false
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'pug');

app.route('/').get((req, res) => {
  res.render('pug/index', {
    'title' : 'Hello', 
    'message' : 'Please login'
  });
});

const PORT = 5000 || process.env.PORT
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
