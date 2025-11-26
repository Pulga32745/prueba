import express from 'express';
import UserController from '../controllers/User.js';
import validateToken from '../auth/validateToken.js';

const UserAllRouter = express.Router();

// 📌 GET /api/v1/users → Obtener todos los usuarios
UserAllRouter.get('/', validateToken, UserController.getAll);

// 📌 GET /api/v1/users/profile → Perfil del usuario autenticado
UserAllRouter.get('/profile', validateToken, UserController.profile);

export default UserAllRouter;

