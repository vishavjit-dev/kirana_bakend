const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    
  },
  lastName: {
    type: String,
    
  },
  email: {
    type: String,
    
  },
  phone: {
    type: String,
    
  },
  password: {
    type: String,
   
  },
  apartmentNumber:{
    type: String
  },
  selectstate:{
    type: String
  },
  area:{
     type: String
  },
  landmark:{
    type: String
  },

  addressType:{
    type: String
  },
  pincode:{
    type: String
  },



  
});

 const Registration = mongoose.model('reg', UserSchema);
 
 module.exports = Registration;
