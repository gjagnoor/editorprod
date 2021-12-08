/* eslint-disable new-cap */
const router = require('express').Router();
const db = require('../firestore/index.js');
const redis = require('../redis/index.js');
const s3 = require('../storageS3/index.js');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();
console.log('in', process.env.NODE_ENV);

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.json('you\'re not authenticated');
  } else {
    next();
  }
};

router.get('/hello', async (req, res, next) => {
  res.json('I\'m here');
});

router.post('/project', authCheck, async (req, res, next) => {
    console.log("req.body", req.body);
    // to split into 3 functions after this works
     /*
          {
              name: ,
              userID: ,
              key: ,
              content: { // goes to S3
                  html: ``,
                  css: ``,
                  js: ``
              }
          }
    */
    const paramsHTML = {
        Bucket: 'editorv1',
        Body: req.body.content.html,
        Key: `${req.user.id}/${req.body.name}/structure.html`,
    };
    const paramsJS = {
        Bucket: 'editorv1',
        Body: req.body.content.js,
        Key: `${req.user.id}/${req.body.name}/interaction.js`,
    };
    const paramsCSS = {
        Bucket: 'editorv1',
        Body: req.body.content.css,
        Key: `${req.user.id}/${req.body.name}/style.css`,
    };
    await s3.upload(paramsHTML, req.body.html).promise(),
    await s3.upload(paramsJS, req.body.js).promise(),
    await s3.upload(paramsCSS, req.body.css).promise(),
    let [projects, allProjects] = await prisma.$transaction([
        prisma.project.create({
        data: {
            name: req.body.name,
            userID: req.user.id,
            key: `${req.user.id}/${req.body.name}`,
        },
        }),
        prisma.project.findMany({
        where: {
            userID: req.user.id,
        },
        }),
    ]);
    // fetch all projects from s3 and load them on the object. To improve this process later. 
    const promiseHTML = s3.getObject(paramsHTML, (err, data) => {
        data = data.Body.toString('utf-8');
        return data;
    }).promise();
    const promiseCSS = s3.getObject(paramsCSS, (err, data) => {
        data = data.Body.toString('utf-8');
        return data;
    }).promise();
    const promiseJS = s3.getObject(paramsHTML, (err, data) => {
        data = data.Body.toString('utf-8');
        return data;
    }).promise();
    await Promise
        .all([promiseHTML, promiseJS, promiseCSS])
        .then(function (data) {
            const all = allProjects.map((project) => {
                if (project.name !== req.body.name) {
                    return project;
                } else {
                    return {
                        ...project,
                        content: data
                    }
                }
            });
            return res.json(all);
        })
        .catch((err) => console.err(err)); // res.json(values) here
});

router.put('/project', authCheck, async (req, res, next) => {
  /*
        {
            name: ,
            userID: ,
            key: ,
            content: { // goes to S3
                html: ``,
                css: ``,
                js: ``
            }
        }
  */
});

router.get('/projects', authCheck, async (req, res, next) => {
  // get all project names and S3 path name from postgreSQL
  // get all projects from s3 and map them to each other
  // return the array
});

module.exports = router;
