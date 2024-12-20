const { verifyToken } = require('../utils/jwt');  
const authenticate = (req, res, next) => {
  
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
    
        const decoded = verifyToken(token);
        req.userId = decoded.userId;  
        next();  
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authenticate;
