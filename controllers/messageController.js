const Message = require("../models/message");

exports.message_list_get = (req, res, next) => {
  res.send("Not Implemented: Show all messages GET");
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
