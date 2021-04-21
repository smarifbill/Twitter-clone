const axios = require("axios");
//const passport = require("passport");
const db = require("../../db");
const Userdb = db.users;
const Tweetdb = db.posts;

//export routes/function to router.js
exports.homeRoutes = (req, res) => {
  //make a get request to /api/users

  //res.render("index");

  Userdb.findAll().then(function (userData) {
    Tweetdb.findAll().then(function (userTweet) {
      var tweetdata = {
        data: userData,
        tweet: userTweet,
      };

      console.log(userData, userTweet);
      res.render("index", {
        tweetdata: tweetdata,
        user: userData,
        tweet: userTweet,
      });
    });
  });

  /*
  Tweetdb.findAll()
    .then(function (usertweet) {
      res.render("index", { tweet: usertweet });
      console.log(userdata);
    })
    .catch((err) => {
      res.send("Can't find user");
      console.log(err);
    });
    */
}; //

exports.add_user = (req, res) => {
  res.render("sign_up");
};

exports.login = (req, res) => {
  res.render("sign_in");
};

exports.profile = (req, res) => {
  res.render("dashboard", { name: req.user.name });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

/*
exports.update_user = (req, res) => {
  axios
    .get(
      "http://localhost:2000/api/users",
      { params: { id: req.query.id } }.then(function (userdata) {
        res.render("update_user", { user: userdata.data });
      })
    )
    .catch((err) => {
      res.send(err);
    });
};
*/
