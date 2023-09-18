const express = require('express')
const path = require('path');
const accountRoute = require('./routes/account-routes')
const noteRoute = require('./routes/note-routes')
const session = require("express-session")
const pgSession = require('connect-pg-simple')(session);
const pgPool = require('./database/index')
const flash = require('connect-flash');
const cookieParser = require("cookie-parser");





PORT = process.env.PORT || 8080

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')

app.use(cookieParser())

app.use(session({
  store: new pgSession({
    pool : pgPool,                // Connection pool
    tableName : 'session'   
  }),
  secret: process.env.FOO_COOKIE_SECRET,
  resave: false,
  cookie: { maxAge: 60 * 60 * 1000 },
  saveUninitialized: false
}));

// flash middleware for messages
app.use(flash())
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});



app.use(express.json())
// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.use(
  (req, res, next)=>{
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    next()
  }
)


// health check
app.get('/hc', ()=>{
  res.status(200).send('ok')
})


// index page
app.get('/', function(req, res) {
    res.render('pages/login', {
      message: false
      
    });
  });

app.use('/account', accountRoute)
app.use('/note', noteRoute)

app.listen(PORT, ()=> {
    console.log('App is listening on port', PORT);
})