'use strict';

const app = require('APP')
const debug = require('debug')(`${app.name}:auth`)
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('APP/db/models/index.js').User
const models = require('APP/db/models/index.js')
const OAuth = require('APP/db/models/oauth')
const auth = require('express').Router()
const {env} = app
let secrets;

try {
  secrets = require('APP/secrets.js')
} catch (e) {
  console.log(e.message);
  console.log('OAuth will not work without \'APP/secrets.json\'');
  secrets = {};
}


passport.serializeUser((user, done) => {
  debug('will serialize user.id=%d', user.id)
  done(null, user.id)
  debug('did serialize user.id=%d', user.id)
})

passport.deserializeUser(
  (id, done) => {
    debug('will deserialize user.id=%d', id)
    User.findById(id)
      .then(user => {
        user ? debug('deserialize did ok user.id=%d', user.id) : null;
        done(null, user)
      })
      .catch(err => {
        debug('deserialize did fail err=%s', err)
        done(err)
      })
  }
)

passport.use(
  new GoogleStrategy({
    clientID: secrets.GOOGLE_CONSUMER_KEY,
    clientSecret: secrets.GOOGLE_CONSUMER_SECRET,
    callbackURL: 'api/auth/google/verify'
  },
  function (token, refreshToken, profile, done) {
    var info = {
      name: profile.displayName,
      email: profile.emails[0].value
    };
    OAuth.findOrCreate({
      where: {
        provider: profile.provider,
        uid: profile.id,
      }
    })
    .then(oauth => {
      debug('provider:%s will log in user:{name=%s uid=%s}',
        profile.provider,
        profile.displayName,
        token.uid)
        oauth.profileJson = profile
      return db.Promise.props({
        oauth,
        user: token.getUser(),
        _saveProfile: oauth.save(),
      })
    })
    .then(({ oauth, user }) => user ||
      User.create({
        name: profile.displayName,
      }).then(user => db.Promise.props({
        user,
        _setOauthUser: oauth.setUser(user)
      }))
    )
    .then(({ user }) => done(null, user))
    .catch(done)
  })
)

// Google authentication and login
auth.get('/google', passport.authenticate('google', { scope: ['profile', 'email']}));

// handle the callback after Google has authenticated the user
auth.get('/google/verify',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect(`/`);
  }
);

module.exports = auth