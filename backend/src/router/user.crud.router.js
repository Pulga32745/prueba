import { Router } from 'express';
import UserController from '../controllers/User.js';
import validateToken from '../auth/validateToken.js';

const UserRouter = Router();

// Eliminamos rutas que no existen en el controller
export default UserRouter;
