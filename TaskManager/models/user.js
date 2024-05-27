const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Email is invalid");
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password"))
        throw new Error('Password cannot contain "password"');
    },
  },
  age: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) throw new Error("Invalid Age");
    },
  },
});

userSchema.statics.findByCredentials = async (email, password) => {
    console.log("here")
  const user = await User.findOne({ email });
  if(!user) throw new Error('Unable to login')

  const isMatch = await bcrypt.compare(password, user.password)
  if(!isMatch) throw new Error('Unable to login')
   console.log(user)  
  return user  
};

userSchema.pre("save", async function (next) {
  const user = this;

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
