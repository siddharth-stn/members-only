const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  username: { type: String, required: true },
  password: { type: String, required: true },
  membershipStatus: {
    type: String,
    required: true,
    enum: ["Normal", "Club Member"],
    default: "Normal",
  },
  isAdmin: {
    type: String,
    required: true,
    enum: [true, false],
    default: false,
  },
});

UserSchema.virtual("name").get(function () {
  return `${this.first_name} ${this.family_name}`;
});

UserSchema.virtual("url").get(function () {
  return `/story/user/${this._id}`;
});

module.exports = mongoose.model("User", UserSchema);
