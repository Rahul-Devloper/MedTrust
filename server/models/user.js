const mongoose = require("mongoose");
const { Objectid } = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Using bcrypt to compare user entered password with user db password
userSchema.methods.comparePassword = (candidatePassword, callback) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);
