const express = require("express");
//create diff routes in seperate file
const route = express.Router();

const services = require("../controllers/render");
const controller = require("../controllers/controller");
//const verifySignUp = require("../middlewares/verifySignUp");

//load passport config
const passport = require("../middlewares/passport");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../middlewares/isAuthenticated");

/**
 * @description Root Route
 * @method GET/
 */
route.get("/", services.homeRoutes);
//route.get("/register", services.homeRoutes);

/**
 * @description add users
 * @method GET/add-user
 */
route.get("/add-user", services.add_user);

/**
 * @description login user
 * @method GET/login
 */
route.get("/login", services.login);

route.get("/profile", isAuthenticated, services.profile);

route.get("/logout", services.logout);

/**
 * @description for update user
 * @method GET/update-user
 */
//route.get("/update-user", services.update_user);

//API
route.post("/users/public", controller.signup);
route.post("/users/login", passport.authenticate("local"), controller.signin);
route.post("/api/posts", controller.regPost);
//route.post("/api/users", controller.create);
route.get("/users/tweets", controller.find);
// route.put("/api/users/:id", controller.update);
// route.delete("/api/users/:id", controller.delete);

module.exports = route;
