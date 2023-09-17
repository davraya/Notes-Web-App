require("dotenv").config()

const jwt = require('jsonwebtoken')

// Generate JWT token
function generateToken(username) {
    const payload = {
      user: username
    };
    const options = {
      expiresIn: '1h', // Token expiration time
    };
    console.log(process.env.JWT_SECRET);
    return jwt.sign(payload, process.env.JWT_SECRET, options);
}


  
// Verify JWT token middleware
function verifyToken(req, res, next) {
const token = req.cookies.jwt;

if (!token) {
    return res.status(403).json({ message: 'No token provided.' });
}

jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
    return res.status(401).json({ message: 'Invalid token.' });
    }
    req.user = decodedToken;
    next();
});
}



  module.exports = {
    generateToken,
    verifyToken
  }