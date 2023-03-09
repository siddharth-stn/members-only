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
  res.send(`Not Implemented: Create new message GET`);
};

exports.message_create_post = (req, res, next) => {
  res.send("Not Implemented: Create new message POST");
};

exports.message_delete_post = (req, res, next) => {
  res.send("Not Implemented: Delete messages POST");
};
