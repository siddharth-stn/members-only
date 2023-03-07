const User = require("../models/user");

exports.sign_up_get = (req, res, next) => {
  // if the user is not already logged in,
  // sign up page will be shown
  // along with a link to the login page

  // if the user is already logged in then, the
  // page will be redirected to the dashboard (show/list all messages)
  res.send("Not Implemented: Sign Up get route");
};

exports.sign_up_post = (req, res, next) => {
  // after successful sign up show the dashboard
  res.send("Not Implemented: Sign Up POST");
};

exports.login_get = (req, res, next) => {
  res.send("Not Implemented: Login GET");
};

exports.login_post = (req, res, next) => {
  // after successful login show the dashboard
  res.send("Not Implemented: Login POST");
};

exports.join_club_get = (req, res, next) => {
  res.send("Not Implemented: Join Club GET");
};

exports.join_club_post = (req, res, next) => {
  // update the logged in user membership status to Club Member
  // if the user enters the secret password
  // after successful operation redirect to the dashboard
  res.send("Not Implemented: Join Club POST");
};

exports.make_admin_get = (req, res, next) => {
  res.send("Not Implemented: Make Admin GET");
};

exports.make_admin_post = (req, res, next) => {
  res.send("Not Implemented: Make Admin POST");
};
