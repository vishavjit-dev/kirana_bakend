const jwt = require('jsonwebtoken');
const User = require("../Modals/user");
require('dotenv').config();



// Signup Controller
exports.signup = async (req, res) => {

  console.log(req.body);
    const { username, email, password } = req.body;
  
    
  
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Create new user instance
      const user = new User({
        username,
        email,
        password,
      });
  
      // Save the user to the database
      const resp=await user.save();
  
      // Return success response without token
     res.status(200).send({message:"registration success",user:resp})
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };



  exports.login = async (req, res) => {
    const { username, password } = req.body;
   
    
  
    try {
      // Check if the user exists by username
      const user = await User.findOne({ username:username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Compare passwords directly (no hashing)
      if (password !== user.password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, username: user.username }, // Payload
        process.env.JWT_SECRET,                   // Secret Key
        { expiresIn: '1h' }                       // Options (e.g., expiration time)
      );
  
      // Send response with token
      res.status(200).send({
        success: true,
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(500).send({ success: false, error: error.message });
    }
  };

