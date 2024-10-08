// src/server.js
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import Routers from './routers/index.js';

const PORT = Number(process.env.PORT) ? Number(process.env.PORT) : 3000;

export const setupServer = () => {
  const app = express();

  const corsOptions = {
    origin: ['http://localhost:5173', 'https://waterin-server.onrender.com', 'https://water-in.vercel.app', 'http://127.0.0.1:5173'],
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );
  app.use(cookieParser());
  app.use('/api-docs', swaggerDocs());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(Routers);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
