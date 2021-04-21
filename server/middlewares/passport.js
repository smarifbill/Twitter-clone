require("dotenv").config(); //
//import passport packages required for authentication
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Strategy, ExtractJwt } = require("passport-jwt"); //

//Load models to check passport against
const db = require("../../db");
const Userdb = db.users;

//
/*
const params = {
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
};
*/
//we want login with a username/email and password so use a Local Strategy.
passport.use(
  new LocalStrategy(
    //params, //
    // User will sign in using an email, as "username"
    {
      usernameField: "email",
    },
    function (email, password, done) {
      // When a user tries to login , search db
      Userdb.findOne({
        where: {
          email: email,
        },
      }).then(function (foundUser) {
        // If there's no user with the given email
        if (!foundUser) {
          return done(null, false, {
            message: "Incorrect email.",
          });
        }
        // If there is a user with the given email, but the password is incorrect
        else if (!foundUser.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password.",
          });
        }
        // If none of the above, return the user
        return done(null, foundUser);
      });
    }
  ) //end of local strategy
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user as per passport docs
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

/*
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  Userdb.findByPk(id, function (err, user) {
    done(err, user);
  });
});
*/

// Exporting our configured passport
module.exports = passport;
