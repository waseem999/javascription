'use strict';

const app = require('APP')
const debug = require('debug')(`${app.name}:auth`)
const passport = require('passport');
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
  console.log('OAuth will not work without \'APP/secrets.js\'');
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

// Google authentication and login
auth.get('/google', passport.authenticate('google', { scope: ['profile', 'email']}));

passport.use(
  new GoogleStrategy({
    clientID: secrets.GOOGLE_CONSUMER_KEY,
    clientSecret: secrets.GOOGLE_CONSUMER_SECRET,
    callbackURL: `${app.baseUrl}/api/auth/login/google`
  },
  function (token, refreshToken, profile, done) {
    var info = {
      name: profile.displayName,
      email: profile.emails[0].value
    };
    User.findOrCreate({
      where: {googleId: profile.id},
      defaults: info
    })
    .spread(function (user) {
      done(null, user);
    })
    .catch(done);
  })
)

// handle the callback after Google has authenticated the user
auth.get('/login/google',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login' 
  })
);


// Other passport configuration:


passport.use(new (require('passport-local').Strategy) (
  (email, password, done) => {
    debug('will authenticate user(email: "%s")', email)
    User.findOne({where: {email}})
      .then(user => {
        if (!user) {
          debug('authenticate user(email: "%s") did fail: no such user', email)
          return done(null, false, { message: 'Login incorrect' })
        }
        return user.authenticate(password)
          .then(ok => {
            if (!ok) {
              debug('authenticate user(email: "%s") did fail: bad password')
              return done(null, false, { message: 'Login incorrect' })
            }
            debug('authenticate user(email: "%s") did ok: user.id=%d', user.id)
            done(null, user)
          })
      })
      .catch(done)
  }
))

auth.get('/whoami', (req, res) => {
  res.send(req.user)
})

auth.post('/:strategy/login', (req, res, next) =>
  passport.authenticate(req.params.strategy, {
    successRedirect: '/'
  })(req, res, next)
)

auth.get('/:strategy/login', (req, res, next) => {
  passport.authenticate(req.params.strategy, {
    successRedirect: '/'
  })(req, res, next)
})

auth.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/api/auth/whoami')
})

module.exports = auth
