// adminAuthMiddleware.js
import jwt from 'jsonwebtoken';

const adminCred = {
  AdminEmail:'admin@gmail.com',
  AdminPassword: '1234'
}

const adminAuthMiddleware = (req, res, next) => {
  // Get the token from the request header or query parameters (adjust as needed)
  const token = req.headers.authorization.split(' ')[1]; // Assuming you send the token as a Bearer token in the header

  if (!token) {
    return res.status(401).json({ message: 'Authorization token not provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_Secret);

    console.log(decoded);

    // Check if the decoded email matches the admin's email
    if (decoded.id === adminCred.AdminEmail) {
      // Admin is authenticated
      
      next();
    } else {
      return res.status(403).json({ message: 'Access forbidden' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default adminAuthMiddleware;
