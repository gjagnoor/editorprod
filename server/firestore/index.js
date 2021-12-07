/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const {initializeApp} = require('firebase-admin/app');
const admin = require('firebase-admin');
const serviceAccount = require('../../editor-adminsdk.json');

initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://<editor-8bdaf>.firebaseio.com',
});

const db = admin.firestore();

module.exports = db;


