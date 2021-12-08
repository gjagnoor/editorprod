/* eslint-disable new-cap */
const router = require('express').Router();
const passport = require('passport');
const db = require('../firestore/index.js');
const redis = require('../redis/index.js');
const s3 = require('../storageS3/index.js');
require('dotenv').config();
console.log('in', process.env.NODE_ENV);

const loginDomain =
    process.env.NODE_ENV === 'development' ?
        'http://localhost:3000/editor' :
    'https://editorprod.herokuapp.com/editor';

const logoutDomain =
    process.env.NODE_ENV === 'development' ?
        'http://localhost:3000/' :
    'https://editorprod.herokuapp.com/';

const authenticationOptions = {
  scope: ['user:email'],
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
  return res.json(req.user);
});

// auth login with google
router.get('/github', passport.authenticate('github', authenticationOptions));

// auth logout
router.get('/logout', authCheck, function(req, res) {
  req.logout();
  return res.redirect(logoutDomain);
});

// redirect
router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
  return res.redirect(loginDomain);
});

// db.collection('userConfig').doc('9382293kjdnkjaendk').set({
//   id: '9382293kjdnkjaendk',
//   configVar1: true,
// });
// testing firestore
db.collection('userConfig').doc('9382293kjdnkjaendk').get().then((snapshot) => {
  console.log('firestore logging data:', snapshot.data());
});

module.exports = router;
