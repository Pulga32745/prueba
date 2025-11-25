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
}

export default UserController;
