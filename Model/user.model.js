const { Schema, model } = require("mongoose");
const UserSchema = new Schema({
  email: { type: String, unique: true },
  pass: String,
  name: String,
  loginAttempts: {
    type: Number,
    required: true,
    default: 0,
  },
  lockUntil: {
    type: Number,
    required: true,
    default: Date.now(),
  },
  block: {
    type: Boolean,
    require: true,
    default: false,
  },
});
const UserModel = model("user", UserSchema);
module.exports = UserModel;
