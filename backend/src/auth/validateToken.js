import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export default function validateToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded); 
    });
  });
}
