// get secured info in .env file
const dotenv = require("dotenv");
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const path = require("path");

// Requiring passport as we've configured it
var passport = require("./server/middlewares/passport");

//load & inject dependencies easily
//const consign = require("consign");

//get config settings in .env file
dotenv.config({ path: "config.env" });
const port = process.env.PORT || 2000;
//load DB
const db = require("./db");
//sync the model to the db. force: true will drop the table if it already exists
db.sequelize
  .sync({ force: true })
  .then(async () => {
    console.log("DB is ready!");
  })
  .catch((error) => {
    console.log(error);
  });

//create an instance of an express app
const app = express();

//log requests
app.use(morgan("tiny"));

// We need to use sessions to keep track of our user's login status
app.use(
  session({
    secret: process.env.ACCESS_TOKEN_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//set templating engine to ejs
app.set("view engine", "ejs");
//to handle error - Failed to lookup view "index" in views directory
app.set("views", __dirname + "/views");
//get static Files or use images & css files in assets folder.
app.use("/", express.static(path.join(__dirname, "./client/assets")));

//app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//use Jquery & Bootstrap when offline
app.use(
  "/js",
  express.static(path.join(__dirname, "./node_modules/jquery/dist"))
);
app.use(
  "/css",
  express.static(path.join(__dirname, "./node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "./node_modules/bootstrap/dist/js"))
);

//load routers
app.use("/", require("./server/routes/router"));

app.listen(port, (req, res) => {
  console.log(`Server is running on http://localhost:${port}`);
});
