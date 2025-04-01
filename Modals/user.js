const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      
    },
    phone: {
      type: String,
      unique: true,
    },
  });
  
  // No hashing, just saving the plain password
  
  module.exports = mongoose.model("User", UserSchema);
