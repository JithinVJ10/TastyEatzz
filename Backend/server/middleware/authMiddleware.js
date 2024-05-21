import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';
import Hotel from '../model/hotelModel.js';
import Rider from '../model/riderModel.js';

export const protect = async (req, res, next) => {
  // Check if the authorization header exists and starts with 'Bearer'
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Get token from header
    const token = req.headers.authorization.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_Secret);

    // Get user from the token and attach to req object
    req.user = await User.findById(decoded.id).select('-password');

    // Proceed to the next middleware
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: 'Not authorized' });
  }
};

export const hotelProtect = async (req, res, next) => {
  // Check if the authorization header exists and starts with 'Bearer'
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Get token from header
    const token = req.headers.authorization.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_Secret);

    // Get user from the token and attach to req object
    req.user = await Hotel.findById(decoded.id).select('-password');

    // Proceed to the next middleware
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: 'Not authorized' });
  }
};

export const riderProtect = async (req, res, next) => {
  // Check if the authorization header exists and starts with 'Bearer'
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Get token from header
    const token = req.headers.authorization.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_Secret);

    // Get user from the token and attach to req object
    req.user = await Rider.findById(decoded.id).select('-password');

    // Proceed to the next middleware
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: 'Not authorized' });
  }
};

