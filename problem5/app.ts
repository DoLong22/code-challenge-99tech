import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './src/config/db';
import userRouter from './src/services/user';
import { errorHandler } from './src/utils/middlewares/errorHandler';
import { NextFunction, Request, Response } from 'express';
import { setupSwagger } from './src/docs/swagger';
import { requestIdMiddleware } from './src/utils/middlewares/requestId.middleware';
import { logger } from './src/common/logger';
import { RequestContext } from './src/common/RequestContext';

dotenv.config();

const app = express();
app.use(express.json());

// Initialize AsyncLocalStorage context for requestId
app.use(requestIdMiddleware);
app.use((req: Request, res: Response, next: NextFunction) => {
    const requestId = RequestContext.get('requestId') || 'N/A';
    logger.info(`${req.method} ${req.url}`);
    next();
});

AppDataSource.initialize()
    .then(() => logger.info('Database connected'))
    .catch(err => logger.error('Database connection error:', err));

// Swagger Docs
setupSwagger(app);
// Routes
app.use('/api/users', userRouter);

// Error Handler Middleware (MUST be placed after all routes)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
});

app.get('/', (req, res) => {
    res.send('Welcome to User API');
});

export default app;
