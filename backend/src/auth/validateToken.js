import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export default function validateToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Token requerido" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token inválido" });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded; // guardamos info del usuario para el controller

    next(); // sigue la ruta
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
}

