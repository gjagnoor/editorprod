/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const {initializeApp} = require('firebase-admin/app');
const admin = require('firebase-admin');
const serviceAccount = require('../../codebasev1-firebase-adminsdk');

initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://<codebasev1>.firebaseio.com',
});

const db = admin.firestore();

module.exports = db;


