const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport');

const app = express();

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: ['RefactoryTest']
}))

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  
  res.send('<h1><a href="/auth/google">Login</a></h1>')
});


const checkLogin = (req,res,next) => {
  if(!req.user){
    res.redirect('/');
  }else{
    next();
  }
}

app.get('/dashboard',checkLogin, (req, res) => {
  // console.log(req)
  res.send(`<h1>Login dengan user ${req.user.displayName} </h1> <br> <h1><a href="/logout">Logout</a></h1>`)
});

app.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/')
});




app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));


app.get('/auth/google/callback', passport.authenticate('google'), (req,res) => {
 
  res.redirect('/dashboard/');
});


app.listen(2000, () => console.log(`App listening on port ${2000} 🚀🔥`))