import { Router } from 'express';
import UserController from '../controllers/User.js';
import validateToken from '../auth/validateToken.js';

const UserRouter = Router();

// 📌 GET /api/v1/user/:id  → Obtener 1 usuario
UserRouter.get('/:id', validateToken, UserController.getById);

// 📌 POST /api/v1/user  → Crear usuario
UserRouter.post('/', UserController.create);

// 📌 PUT /api/v1/user/:id → Reemplazar usuario completo
UserRouter.put('/:id', validateToken, UserController.update);

// 📌 PATCH /api/v1/user/:id → Actualizar parcialmente
UserRouter.patch('/:id', validateToken, UserController.partialUpdate);

// 📌 DELETE /api/v1/user/:id → Borrar usuario
UserRouter.delete('/:id', validateToken, UserController.delete);

export default UserRouter;

