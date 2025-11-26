import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

export default function validateToken(token) {
  return new Promise((resolve) => {
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) {
        return resolve({ isValid: false, payload: null });
      }
      resolve({ isValid: true, payload: decoded });
    });
  });
}

