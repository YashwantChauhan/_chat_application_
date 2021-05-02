'use strict';


const pug  = require('pug')
const express = require('express');
const myDB = require('./connection');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const session = require('express-session')
const passport = require('passport')
const mongodb = require('mongodb')


const app = express();
app.set('view engine', 'pug');

fccTesting(app); //For FCC testing purposes
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

//-----------------------------------------------------------------------------------------------------------------------------

passport.serializeUser((user,done)=>{
  done(null,user._id);
})

passport.deserializeUser((id,done)=>{
  done(null,null);
})

//-----------------------------------------------------------------------------------------------------------------------------


app.route('/').get((req, res) => {
  res.render(process.cwd() + '/views/pug/index', {
    'title' : 'Hello', 
    'message' : 'Please login'
  })
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
