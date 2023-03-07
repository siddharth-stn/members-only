const User = require("../models/user");

exports.sign_up_get = (req, res, next) => {
  // if the user is not already logged in,
  // sign up page will be shown
  // along with a link to the login page

  // if the user is already logged in then, the
  // page will be redirected to the dashboard
  res.send("Not Implemented: Dashboard get route");
};

exports.sign_up_post = (req, res, next) => {
  res.send("Not Implemented: Sign Up POST");
};

exports.login_get = (req, res, next) => {
  res.send("Not Implemented: Login GET");
};

exports.login_post = (req, res, next) => {
  res.send("Not Implemented: Login POST");
};

exports.join_club_get = (req, res, next) => {
  res.send("Not Implemented: Join Club GET");
};

exports.join_club_post = (req, res, next) => {
  res.send("Not Implemented: Join Club POST");
};

exports.make_admin_get = (req, res, next) => {
  res.send("Not Implemented: Make Admin GET");
};

exports.make_admin_post = (req, res, next) => {
  res.send("Not Implemented: Make Admin POST");
};
