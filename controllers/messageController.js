const { body, validationResult } = require("express-validator");
const Message = require("../models/message");

exports.message_list_get = (req, res, next) => {
  Message.find()
    .exec()
    .then((results) => {
      if (!req.user || req.user.membershipStatus == "Normal") {
        results.forEach((element) => {
          element = {
            title: element.title,
            text: element.text,
          };
        });
        res.render("dashboard", {
          results: results,
        });
        return;
      }
      res.render("dashboard", {
        results: results,
      });
    })
    .catch((err) => next(err));
};

exports.message_create_get = (req, res, next) => {
  if (req.user) {
    res.render("create-message", {
      title: "Create Message",
    });
    return;
  } else {
    const error = new Error("Only a registered user can create message");
    error.status = 404;
    res.render("create-message", {
      title: "Create Message",
      error,
    });
  }
};

exports.message_create_post = [
  // validate and sanitize fields
  body("title").trim().isLength({ min: 1 }).escape(),
  body("text").trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    const anotherError = validationResult(req);

    console.log(req.user._id);
    const message = new Message({
      author: req.user._id,
      title: req.body.title,
      text: req.body.text,
    });

    if (!req.user || !anotherError.isEmpty()) {
      let error;
      if (!req.user) {
        error = new Error(
          "Only Registered Users are allowed to create a message"
        );
      }
      res.render("create-message", {
        title: "Create Message",
        error,
        anotherError,
      });
      return;
    }
    message
      .save()
      .then(() => {
        res.redirect("/story/message-list");
        return;
      })
      .catch(next);
  },
];

exports.message_delete_post = (req, res, next) => {
  if (req.user) {
    Message.findByIdAndDelete(req.body.messageid).then(() => {
      res.redirect("/story/message-list");
    });
  }
};
