const {initializeApp} = require('firebase-admin/app');
const serviceAccount = require('../../codebasev1-firebase-adminsdk.json');
const admin = require('firebase-admin');

initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://<codebasev1>.firebaseio.com',
});

const db = admin.firestore();

module.exports = db;


