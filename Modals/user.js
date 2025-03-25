const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      
    },
  });
  
  // No hashing, just saving the plain password
  
  module.exports = mongoose.model("User", UserSchema);
