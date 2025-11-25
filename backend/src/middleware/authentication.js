import { getToken } from '../auth/getToken.js';
import validateToken from '../auth/validateToken.js';

export const authenticateToken = async (req, res, next) => {
  try {
    const token = getToken(req);

    if (!token) {
      return res.status(401).json({ error: 'Token missing' });
    }

    const { isValid, payload } = await validateToken(token);

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    req.user = payload;
    next();
  } catch (err) {
    console.error('Auth-Middleware error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
