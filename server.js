'use strict';
const pug  = require('pug')
const express = require('express');
const myDB = require('./connection');
const fccTesting = require('./freeCodeCamp/fcctesting.js');

const app = express();

fccTesting(app); //For FCC testing purposes
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');

app.route('/').get((req, res) => {
  res.render('pug/index');
});

const PORT = 5000
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
