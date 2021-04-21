const { Sequelize, Model, DataTypes } = require("sequelize");

//passing a connection URI to connect to the DB
const sequelize = new Sequelize("twitter", "user", "pass", {
  host: "twitterDB.sqlite",
  dialect: "sqlite",
});

//can't view tables in memory
//const sequelize = new Sequelize("sqlite::memory");

// Connect all the models/tables in the database to a db object,
//so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.users = require("./server/models/users")(sequelize, Sequelize);
//db.comments = require('../models/comments.js')(sequelize, Sequelize);
db.posts = require("./server/models/tweets")(sequelize, Sequelize);

//Relation
db.users.hasMany(db.posts, { foreignKey: "user_id", sourceKey: "id" }); // { foreignKey: "fk_userid", sourceKey: "id" } fk_userid Name for new column added to posts
db.posts.belongsTo(db.users, { foreignKey: "user_id", targetKey: "id" }); // sourceKey Column in Users that FK will reference to

//testing the connection
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = db;

//added id field for posts table and associations worked
