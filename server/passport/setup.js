/* eslint-disable max-len */
const passport = require('passport');
const GithubStrategy = require('passport-github2');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

passport.serializeUser((profile, done) => {
  done(null, profile);
});

passport.deserializeUser((profile, done) => {
  done(null, profile);
});

passport.use(new GithubStrategy({
  clientID: process.env.clientIDGithub || require('./github.json').clientIDGithub,
  clientSecret: process.env.clientSecretGithub || require('./github.json').clientSecretGithub,
  callbackURL: process.env.callbackURLGithub || 'http://localhost:7000/api/github/redirect',
},
async function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

