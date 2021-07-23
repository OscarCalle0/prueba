// libraries
import 'reflect-metadata';
import 'module-alias/register';
import dotenv from 'dotenv';
dotenv.config();
import fastify from 'fastify';
import { middlewares, errorHandler } from '@infrastructure/api/middlewares';
import { initRoutes } from '@infrastructure/api/routers';
import { randomBytes } from 'crypto';

export const application = fastify({
    genReqId: (_) => randomBytes(20).toString('hex'),
});

// middlewares
middlewares(application);
errorHandler(application);

// routes
initRoutes(application);
