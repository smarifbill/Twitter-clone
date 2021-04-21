const db = require("../../db");
const Userdb = db.users;

const verifySignUp = (req, res, next) => {
  const email = req.body.email;
  // Email or Username
  Userdb.findAll({
    where: {
      email: email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Email is already in use!",
      });
      return;
    }

    next();
  });
};

// const verifySignUp = {
//   checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
//   //checkRolesExisted: checkRolesExisted,
// };

module.exports = verifySignUp;
