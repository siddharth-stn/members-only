const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  title: { type: String, required: true, maxLength: 100 },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

MessageSchema.virtual("url").get(function () {
  return `/story/message/${this._id}`;
});

module.exports = mongoose.model("Message", MessageSchema);
