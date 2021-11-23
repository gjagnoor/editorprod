/* eslint-disable max-len */
const {initializeApp} = require('firebase-admin/app');
const admin = require('firebase-admin');

const key = process.env.NODE_ENV === 'development' ? require('../../codebasev1-firebase-adminsdk.json') : {
  type: process.env.type,
  project_id: process.env.project_id,
  private_key_id: process.env.private_key_id,
  private_key: process.env.private_key,
  client_email: process.env.client_email,
  client_id: process.env.client_id,
  auth_uri: process.env.auth_uri,
  token_uri: process.env.token_uri,
  auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.client_x509_cert_url,
};
initializeApp({
  credential: admin.credential.cert(key),
  databaseURL: 'https://<codebasev1>.firebaseio.com',
});

const db = admin.firestore();

module.exports = db;


