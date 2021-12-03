/* eslint-disable max-len */
const passport = require('passport');
const GithubStrategy = require('passport-github2');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const googleOptions = {
  callbackURL: '/api/github/redirect',
  clientID: process.env.clientID || require('./github.json').clientID,
  clientSecret: process.env.client_secret ||
        require('./github.json').clientSecret,
};

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GithubStrategy({
  clientID: process.env.clientIDGithub || require('./github.json').clientID,
  clientSecret: process.env.clientSecretGithub || require('./github.json').clientSecret,
  callbackURL: process.env.callbackURLGithub || 'http://localhost:7000/api/github/redirect',
},
async function(accessToken, refreshToken, profile, done) {
  const user = await prisma.user.findUnique({
    where: {
      id: profile.id,
    },
  });
  if (user) {
    return done(null, user);
  } else {
    const newuser = await prisma.user.create({
      data: {
        id: profile.id,
      },
    });
    return done(null, newuser);
  }
}));

