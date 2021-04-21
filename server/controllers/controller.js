require("dotenv").config();

//load models
const db = require("../../db");
const Userdb = db.users;
const Tweetdb = db.posts;
const jwt = require("jsonwebtoken");
//const jwt = require("jwt-simple");
const bcrypt = require("bcrypt");
const { name } = require("ejs");
const passport = require("passport");

//API
//create and save new user
exports.signup = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }

  Userdb.create({
    //saves form data to db
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8), //using hash() throws error string violation: password cannot be an array or an object. Hash() must be an async func
  })
    .then(function () {
      res.redirect("/login");
    })
    .catch(function (error) {
      res.status(500).send({
        message:
          error.message || "Some error occurred while creating a new account",
      });
      console.log(`error occured`, error);
    });
  console.log(Userdb.name);
}; //
//==========================================================================================
exports.signin = (req, res, next) => {
  //get form data - user login details and store in variable
  const { email, password } = req.body;

  if (!email || !password) {
    res.send("Please enter email and password");
  } /*else {
    const token = jwt.sign({ user: email }, process.env.ACCESS_TOKEN_SECRET);

    return res.json({ token });
  }*/

  if (req.user) {
    res.redirect("/profile");
  }
  res.redirect("/");
};
//=========================================================================================================
//save posts to posts db
exports.regPost = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }

  Tweetdb.create({
    //saves form data to db
    content: req.body.tweet,
  })
    .then(function () {
      res.redirect("/");
    })
    .catch(function (error) {
      res.status(500).send({
        message:
          error.message || "Some error occurred while creating a new account",
      });
      console.log(`error occured`, err);
    });
  console.log(Tweetdb.name);
}; //
//=================================================================================
//retrieve and return all users/ retrieve and return a single user
exports.find = (req, res) => {
  /*
  if (req.query.id) {
    //return single user
    const id = req.query.id;

    Userdb.findByPk(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: `User with id ${id} not found` });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: `Cannot retrieve user with id ${id}` });
      });
  } else {
    //return all users

    Userdb.findAll({ where: id })
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error occurred while retrieving data",
        });
      });
  }
  */
  Userdb.findAll({
    where: {
      name: name,
    },
  })
    .then(function (userdata) {
      res.render("index", { data: userdata });
    })
    .catch((err) => {
      res.send("Can't find user");
      console.log(err);
    });
};
//=================================================================================
//update a new identified user by user id
/*
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update cannot be empty" });
  }

  const id = req.params.id; //url parameter
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot update user with ${id}. User not found!` });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating user information" });
    });
};
//=================================================================================
//delete a user with specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot delete user with id ${id}. Id is wrong` });
      } else {
        res.send({ message: "User was deleted successfully" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: `Could not delete user with id ${id}` });
    });
};
*/
