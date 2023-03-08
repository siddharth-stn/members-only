const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// if the user is not already logged in,
// sign up page will be shown
// along with a link to the login page

// if the user is already logged in then, the
// page will be redirected to the dashboard (show/list all messages)
//res.send("Not Implemented: Sign Up get route");
exports.sign_up_get = (req, res, next) => {
  res.render("index", {
    heading: "Sign - Up",
  });
};

// after successful sign up show the dashboard
exports.sign_up_post = [
  // validate and sanitize fields
  body("first_name", "First name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("family_name", "Family name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("username", "Username must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("confPassword")
    .trim()
    .custom((value, { req }) => {
      if (value != req.body.password) {
        return Promise.reject("Password and Confirm Password do not match");
      }
      return true;
    })
    .escape(),

  // Process the request after validation and sanitization
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create the user object with escaped and trimmed data
    // and hashed password
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      const user = new User({
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        username: req.body.username,
        password: hashedPassword,
      });

      if (!errors.isEmpty()) {
        // There are errors. Render the form again with
        // sanitized values/error messages
        res.render("index", {
          heading: "Sign - Up",
          user: user,
          errors: errors.array(),
        });
        return;
      }
      user
        .save()
        .then(() => {
          console.log(user.url);
          // res.redirect()
          next();
        })
        .catch((err) => next(err));
    });
  },
];

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
