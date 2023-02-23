const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    requrired: [true, "Please Enter product Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    requrired: [true, "Please Enter product Email"],
    unique: [true],
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    equrired: [true, "Please Enter product Password"],
    minLength: [4, "Password should be greater than 4 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      requrired: true,
    },
    url: {
      type: String,
      requrired: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
module.exports = mongoose.model("user", userSchema);
