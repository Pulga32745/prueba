import { UserModelSupabase } from '../models/User.Supabase.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

class UserController {
  // ----------------------------------------
  // 🔥 REGISTRO DE USUARIO
  // ----------------------------------------
  static async register(req, res) {
    try {
      const { nombre, email, password, role } = req.body;

      if (!nombre || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }

      // ¿Existe usuario?
      const existe = await UserModelSupabase.getByEmail(email);
      if (existe) {
        return res.status(400).json({ error: 'El email ya está registrado' });
      }

      // Hash password
      const hashed = await bcrypt.hash(password, 10);

      // Crear usuario
      const nuevoUsuario = await UserModelSupabase.create({
        nombre,
        email,
        password: hashed,
        role: role || 'user',
      });

      return res.status(201).json({
        mensaje: 'Usuario registrado con éxito',
        usuario: {
          id: nuevoUsuario.id,
          nombre: nuevoUsuario.nombre,
          email: nuevoUsuario.email,
          role: nuevoUsuario.role,
        },
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // ----------------------------------------
  // 🔥 LOGIN
  // ----------------------------------------
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password)
        return res.status(400).json({ error: 'Email y contraseña requeridos' });

      const user = await UserModelSupabase.getByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Tokens
      const accessToken = jwt.sign({ id: user.id, role: user.role }, config.JWT_SECRET, {
        expiresIn: '15m',
      });

      const refreshToken = jwt.sign({ id: user.id }, config.JWT_REFRESH_SECRET, {
        expiresIn: '7d',
      });

      return res.json({
        mensaje: 'Inicio de sesión correcto',
        user: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          role: user.role,
        },
        accessToken,
        refreshToken,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // ----------------------------------------
  // 🔒 PERFIL DEL USUARIO AUTENTICADO
  // ----------------------------------------
  static async profile(req, res) {
    try {
      const userToken = req.user; // viene del middleware authenticateToken

      const user = await UserModelSupabase.getById(userToken.id);

      return res.json({
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // ----------------------------------------
// 🔹 ADMIN → Obtener todos los usuarios
// ----------------------------------------
static async getAll(req, res) {
  try {
    const users = await UserModelSupabase.getAll();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// ----------------------------------------
// 🔹 ADMIN → Obtener usuario por ID
// ----------------------------------------
static async getById(req, res) {
  try {
    const { id } = req.params;
    const user = await UserModelSupabase.getById(id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// ----------------------------------------
// 🔹 ADMIN → Crear usuario manualmente
// ----------------------------------------
static async createByAdmin(req, res) {
  try {
    const { nombre, email, password, role } = req.body;

    const existe = await UserModelSupabase.getByEmail(email);
    if (existe) return res.status(400).json({ error: "El email ya existe" });

    const hashed = await bcrypt.hash(password, 10);

    const nuevo = await UserModelSupabase.create({
      nombre,
      email,
      password: hashed,
      role: role || "user",
    });

    return res.status(201).json(nuevo);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// ----------------------------------------
// 🔹 ADMIN → Actualizar usuario
// ----------------------------------------
static async updateByAdmin(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const actualizado = await UserModelSupabase.update(id, data);

    return res.json(actualizado);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// ----------------------------------------
// 🔹 ADMIN → Eliminar usuario
// ----------------------------------------
static async deleteByAdmin(req, res) {
  try {
    const { id } = req.params;

    const eliminado = await UserModelSupabase.delete(id);

    return res.json({ message: "Usuario eliminado", eliminado });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

}

export default UserController;
