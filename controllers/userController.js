const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");

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
          req.logIn(user, (err) => {
            if (err) {
              return next(err);
            } else {
              res.redirect("/story/message-list");
            }
          });
        })
        .catch((err) => next(err));
    });
  },
];

exports.login_get = (req, res, next) => {
  res.render("login", {
    heading: "Login",
  });
};

exports.login_post = [
  // validate and sanitize fields
  body("username", "Username must not be empty").trim().escape(),
  body("password", "Password must not be empty").trim().escape(),

  // Process the request after validation and sanitization
  (req, res, next) => {
    // Extract the validation errors from req
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("login", {
        heading: "Login",
        errors: errors.array(),
      });
      return;
    }
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.render("login", {
          heading: "Login",
          errors: info,
        });
      } else {
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect("/story/message-list");
        });
      }
    })(req, res, next);
  },
];

exports.join_club_get = (req, res, next) => {
  res.render("join-club", {
    title: "Join Club",
  });
};

exports.join_club_post = (req, res, next) => {
  // update the logged in user membership status to Club Member
  // if the user enters the secret password
  // after successful operation redirect to the dashboard
  if (req.user) {
    if (req.body.secret === "clubber") {
      User.findByIdAndUpdate(req.user._id, {
        membershipStatus: "Club Member",
      }).then(() => {
        res.redirect("/story/message-list");
      });
    } else {
      const error = "Wrong Secret Key";
      res.render("join-club", {
        title: "Join Club",
        error,
      });
      return;
    }
  }
};

exports.make_admin_get = (req, res, next) => {
  res.render("make-admin", {
    title: "Make Admin",
  });
};

exports.make_admin_post = (req, res, next) => {
  if (req.user) {
    if (req.body.secretAdminKey === "rupert") {
      User.findByIdAndUpdate(req.user._id, {
        isAdmin: true,
      }).then(() => {
        res.redirect("/story/message-list");
      });
    } else {
      const error = "Wrong Secret Key";
      res.render("make-admin", {
        title: "Make Admin",
        error,
      });
      return;
    }
  }
};
