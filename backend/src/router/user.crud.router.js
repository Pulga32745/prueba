import { Router } from "express";
import { authenticateToken } from "../middleware/authentication.js";
import role from "../middleware/role.js";
import UserController from "../controllers/User.js";

const UserCrudRouter = Router();

// ----------------------------------------------
// 🔥 CREAR USUARIO (registro normal)
// ----------------------------------------------
UserCrudRouter.post(
  "/register",
  UserController.register
);

// ----------------------------------------------
// 🔥 LOGIN
// ----------------------------------------------
UserCrudRouter.post(
  "/login",
  UserController.login
);

// ----------------------------------------------
// 🔒 PERFIL DEL USUARIO AUTENTICADO
// ----------------------------------------------
UserCrudRouter.get(
  "/profile",
  authenticateToken,
  UserController.profile
);

// ----------------------------------------------
// 🛠 CRUD ADMIN
// ----------------------------------------------

// 🔹 Obtener todos los usuarios
UserCrudRouter.get(
  "/all",
  authenticateToken,
  role("admin"),
  UserController.getAll
);

// 🔹 Obtener usuario por ID
UserCrudRouter.get(
  "/:id",
  authenticateToken,
  role("admin"),
  UserController.getById
);

// 🔹 Crear usuario manualmente (admin)
UserCrudRouter.post(
  "/create",
  authenticateToken,
  role("admin"),
  UserController.createByAdmin
);

// 🔹 Actualizar usuario
UserCrudRouter.put(
  "/update/:id",
  authenticateToken,
  role("admin"),
  UserController.updateByAdmin
);

// 🔹 Eliminar usuario
UserCrudRouter.delete(
  "/delete/:id",
  authenticateToken,
  role("admin"),
  UserController.deleteByAdmin
);

export default UserCrudRouter;



