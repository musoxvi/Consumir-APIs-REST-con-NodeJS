var express = require("express");
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy

var app = express();

//middleware passport
app.use(passport.initialize());
app.use(passport.session());

//Omniauth / Oauth
passport.use(new GoogleStrategy({
  clientID: "422666713926-k0dqju2prf72rjd5rb872gpf6utt6ahp.apps.googleusercontent.com",
  clientSecret: "FWbuWQCpKkDJt3pslW3tAEjj",
  callbackUrl: "http://localhost:8080/auth/google/callback",
},function(accessToken, refreshToken, profile, cb){
  var user = {
    accessToken: accessToken,
    refreshToken: refreshToken,
    profile: profile
  };

  return cb(null, user);
}));

passport.serializeUser(function(user, done){
  done(null,user);
});

passport.deserializeUser(function(user, done){
  done(null,user);
});

app.set('view engine', 'pug');

app.get("/", function(req, res){
  res.render('index');
});

app.post("/login", passport.authenticate('google', {
  // Iniciar sesion con Google permisos de la cuenta de google
  scope: [
    'profile',
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/userinfo.email',
  ],
}));

app.listen(8080);