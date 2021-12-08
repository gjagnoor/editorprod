/* eslint-disable new-cap */
const router = require('express').Router();
const db = require('../firestore/index.js');
const redis = require('../redis/index.js');
const s3 = require('../storageS3/index.js');
const uniqid = require('uniqid');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();
console.log('in', process.env.NODE_ENV);

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.json([]);
  } else {
    next();
  }
};

router.post('/project', authCheck, async (req, res, next) => {
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
  await s3.upload(paramsHTML).promise();
  await s3.upload(paramsJS).promise();
  await s3.upload(paramsCSS).promise();
  const [project, allProjects] = await prisma.$transaction([
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
  ]).catch((err) => console.error(err));
  const all = await Promise.all(allProjects.map(async (project) => {
    const dataHTML = await s3.getObject({
      Bucket: 'editorv1',
      Key: `${req.user.id}/${project.name}/structure.html`,
    }).promise();
    const dataJS = await s3.getObject({
      Bucket: 'editorv1',
      Key: `${req.user.id}/${project.name}/interaction.js`,
    }).promise();
    const dataCSS = await s3.getObject({
      Bucket: 'editorv1',
      Key: `${req.user.id}/${project.name}/style.css`,
    }).promise();
    project.content = {
      html: dataHTML.Body.toString('utf-8'),
      js: dataJS.Body.toString('utf-8'),
      css: dataCSS.Body.toString('utf-8'),
    };
    return project;
  }));
  console.log('all::: ', all);
  return res.json(all);
});

router.put('/project', authCheck, async (req, res, next) => {
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
  await s3.upload(paramsHTML).promise();
  await s3.upload(paramsJS).promise();
  await s3.upload(paramsCSS).promise();
  const allProjects = await prisma.project.findMany({
    where: {
      userID: req.user.id,
    },
  }).catch((err) => console.error(err));
  const all = await Promise.all(allProjects.map(async (project) => {
    const dataHTML = await s3.getObject({
      Bucket: 'editorv1',
      Key: `${req.user.id}/${project.name}/structure.html`,
    }).promise();
    const dataJS = await s3.getObject({
      Bucket: 'editorv1',
      Key: `${req.user.id}/${project.name}/interaction.js`,
    }).promise();
    const dataCSS = await s3.getObject({
      Bucket: 'editorv1',
      Key: `${req.user.id}/${project.name}/style.css`,
    }).promise();
    project.content = {
      html: dataHTML.Body.toString('utf-8'),
      js: dataJS.Body.toString('utf-8'),
      css: dataCSS.Body.toString('utf-8'),
    };
    return project;
  }));
  return res.json(all);
});

router.get('/projects', authCheck, async (req, res, next) => {
  const allProjects = await prisma.project.findMany({
    where: {
      userID: req.user.id,
    },
  }).catch((err) => console.error(err));
  const all = await Promise.all(allProjects.map(async (project) => {
    const dataHTML = await s3.getObject({
      Bucket: 'editorv1',
      Key: `${req.user.id}/${project.name}/structure.html`,
    }).promise();
    const dataJS = await s3.getObject({
      Bucket: 'editorv1',
      Key: `${req.user.id}/${project.name}/interaction.js`,
    }).promise();
    const dataCSS = await s3.getObject({
      Bucket: 'editorv1',
      Key: `${req.user.id}/${project.name}/style.css`,
    }).promise();
    project.content = {
      html: dataHTML.Body.toString('utf-8'),
      js: dataJS.Body.toString('utf-8'),
      css: dataCSS.Body.toString('utf-8'),
    };
    return project;
  }));
  return res.json(all);
});

router.delete(`/project`, authCheck, async (req, res, next) => {
  const [deletedProject, allProjects] = await prisma.$transaction([
    prisma.project.delete({
      where: {
        key: req.body.project.key,
      },
    }),
    prisma.project.findMany({
      where: {
        userID: req.user.id,
      },
    }),
  ]).catch((err) => console.error(err));
  await s3.deleteObject({
    Bucket: 'editorv1',
    Key: `${req.user.id}/${req.body.project.name}/structure.html`,
  }).promise();
  await s3.deleteObject({
    Bucket: 'editorv1',
    Key: `${req.user.id}/${req.body.project.name}/style.css`,
  }).promise();
  await s3.deleteObject({
    Bucket: 'editorv1',
    Key: `${req.user.id}/${req.body.project.name}/interaction.js`,
  }).promise();
  const all = await Promise.all(allProjects.map(async (project) => {
    const dataHTML = await s3.getObject({
      Bucket: 'editorv1',
      Key: `${req.user.id}/${project.name}/structure.html`,
    }).promise();
    const dataJS = await s3.getObject({
      Bucket: 'editorv1',
      Key: `${req.user.id}/${project.name}/interaction.js`,
    }).promise();
    const dataCSS = await s3.getObject({
      Bucket: 'editorv1',
      Key: `${req.user.id}/${project.name}/style.css`,
    }).promise();
    project.content = {
      html: dataHTML.Body.toString('utf-8'),
      js: dataJS.Body.toString('utf-8'),
      css: dataCSS.Body.toString('utf-8'),
    };
    return project;
  }));
  return res.json(all);
});

module.exports = router;
