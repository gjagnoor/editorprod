/* eslint-disable no-unused-vars */
const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes/index.js');
const passportSetup = require('./passport/setup.js');
const passport = require('passport');
const cookieSession = require('cookie-session');


const port = process.env.PORT || 7000;
app.use(express.json());
require('dotenv').config();
app.use(
  cookieSession({
      name: 'passportCookie',
      maxAge: 24 * 60 * 60 * 1000,
      keys: [process.env.cookie],
    }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../build')));
app.use('/api/', routes);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => console.log(`app is now listening on port ${port}`));
