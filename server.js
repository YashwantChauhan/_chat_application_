'use strict';


const pug  = require('pug')
const express = require('express');
const myDB = require('./connection');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const session = require('express-session')
const passport = require('passport')
const routes = require('./routes')
const auth = require('./auth');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http)


const passportSocketIo = require('passport.socketio')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo');
const URI = process.env.MONGO_URI;
const store = new MongoStore({ url: URI })


app.set('view engine', 'pug');

fccTesting(app); //For FCC testing purposes
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use( session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  store: store,
  saveUninitialized: true,
  cookie: { secure: false },
  key: 'express.sid',
  store: store
}));



app.use(passport.initialize());
app.use(passport.session());

io.use( 
  passportSocketIo.authorize({
    cookieParser: cookieParser,
    key: 'express.sid',
    secret: process.env.SESSION_SECRET,
    store: store,
    success: onAuthorizeSuccess,
    fail: onAuthorizeFail
  })
)
//-----------------------------------------------------------------------------------------------------------------------------

myDB( async client=>{

  const myDataBase = await client.db('myFirstDatabase').collection('users');

  routes(app,myDataBase);
  auth(app,myDataBase);

 
  
  let currentUsers = 0;

  io.on('connection', socket=>{
    console.log(`${socket.request.user.name} has connected`)
    currentUsers++;
    io.emit('user count', currentUsers);

    socket.on('disconnect',()=>{
      console.log('A user has disconnected');
      --currentUsers;
      socket.emit('user count',currentUsers);
    })
    
  });

  

 
}).catch(e=>{
    app.route('/').get((req,res)=>{
      res.render('pug', { title: e, message: 'Unable to login' });
    })
})



function onAuthorizeSuccess(data,accept){
  console.log('Successfull connection to socket.io');
  accept(null,true);
}

function onAuthorizeFail(data, message, error, accept){
  if(error) throw new Error(message);
  console.log('failed connection to socket.io:', message);
  accept(null,false);
}
//-----------------------------------------------------------------------------------------------------------------------------


const PORT = process.env.PORT || 3000
http.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
})
