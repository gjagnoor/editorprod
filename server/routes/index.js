/* eslint-disable new-cap */
const router = require('express').Router();
const passport = require('passport');
const db = require('../firestore/index.js');
require('dotenv').config();
console.log('in', process.env.NODE_ENV);

const noUser = {id: '', name: ''};
const domain =
    process.env.NODE_ENV === 'development' ?
        'http://localhost:3000' :
        'https://codebasev1.herokuapp.com';
const authenticationOptions = {
  scope: ['profile'],
};

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.json('you\'re not authenticated');
  } else {
    next();
  }
};

router.get('/me', async (req, res) => {
  return res.send('I\'m hooked!');
});

router.get('/user', authCheck, async (req, res) => {
  return res.json(req.user || noUser);
});

// auth login with google
router.get('/google', passport.authenticate('google', authenticationOptions));

// auth logout
router.get('/logout', function(req, res) {
  req.logOut();
  return res.json(noUser);
});

// redirect
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  return res.redirect(domain);
});

// db.collection('users').doc().set({
//   name: 'Grace Hopper',
// });
// db.collection('users').doc().set({
//   name: 'Alan Turing',
// });
// testing firestore
db.collection('users').get().then((snapshot) => {
  console.log(snapshot.docs.map((doc) => doc.data()));
  // [ { name: 'GRACE HOPPER' }, { name: 'ALAN TURING' } ]
});

module.exports = router;
