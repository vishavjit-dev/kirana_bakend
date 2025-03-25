const jwt = require('jsonwebtoken');

const protectRoute = (req, res, next) => {
  // Get token from request headers
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  // Check if token is missing
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = protectRoute;
