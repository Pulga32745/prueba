// src/server.js
import morgan from 'morgan';
import cors from 'cors';
import express from 'express';
import ProductAllRouter from './router/product.all.router.js';
import ProductRouter from './router/product.crud.router.js';
import UserAllRouter from './router/user.all.router.js';
import UserRouter from './router/user.crud.router.js';
import notFoundHandler from './middleware/notFoundHandler.js';
import { apiReference } from '@scalar/express-api-reference';
import path from 'path';
import AuthRouter from './router/auth.router.js';
 

const server = express();

// Middlewares básicos
server.use(morgan('dev'));
server.use(express.json());


server.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true
}));



server.use('/openapi.yml', express.static(path.join(process.cwd(), 'docs', 'openapi.yml')));
server.use('/docs',
  apiReference({
    theme: 'purple',
    url: '/openapi.yml',
  }),
);



// Rutas
server.use('/api/v1/products', ProductAllRouter);
server.use('/api/v1/product', ProductRouter);
server.use('/api/v1/users', UserAllRouter);
server.use('/api/v1/user', UserRouter);
server.use('/api/v1/auth', AuthRouter); 


// Manejo 404
server.use(notFoundHandler);

 

export default server;