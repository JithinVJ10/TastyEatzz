import jwt from 'jsonwebtoken';

const adminCred = {
  AdminEmail: 'admin@gmail.com',
  AdminPassword: '1234'
};

export const adminAuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header('authorization');
    
    if (!authHeader) {
      throw new Error('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new Error('Token is missing or invalid');
    }

    const decodedToken = jwt.verify(token, process.env.JWT_Secret);

    if (adminCred.AdminEmail === decodedToken.id) {
      req.admin = adminCred;
      next();
    } else {
      throw new Error('Not authorized or Invalid token');
    }
  } catch (error) {
    console.error('Middleware error:', error.message);
    res.status(401).json({ message: error.message, Status :"Hello" });
  }
};

export default adminAuthMiddleware;
