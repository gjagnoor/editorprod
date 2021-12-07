/* eslint-disable require-jsdoc */
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// configuring the AWS environment
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-2',
});

const s3 = new AWS.S3();
/* uploading a file */
const filePath = 'server/storageS3/file.txt';

// configuring parameters
const params = {
  Bucket: 'editorv1',
  Body: fs.createReadStream(filePath),
  Key: `folder/${path.basename(filePath).split('.')[0]}`,
};

s3.upload(params, function(err, data) {
  // handle error
  if (err) {
    console.log('Error', err);
  }
  // success
  if (data) {
    console.log('Uploaded in:', data.Location);
  }
});

/* reading a file or a set of files */
// const params = {
//   Bucket: 'editorv1', // your bucket name,
//   Key: 'folder/file', // path to the object you're looking for
// };

// s3.getObject(params, (err, data) => {
//   data = data.Body.toString('utf-8');
//   console.log(data);
// });

// Promise.all([firstPromise, secondPromise, thirdPromise])
// .then(function (values) { }); // res.json(values) here

module.exports = s3;
