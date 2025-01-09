import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './src/config/db';
import { errorHandler } from './src/utils/middlewares/errorHandler';
import { NextFunction, Request, Response } from 'express';
import { setupSwagger } from './src/docs/swagger';
import { requestIdMiddleware } from './src/utils/middlewares/requestId.middleware';
import { logger } from './src/common/logger';
import { RequestContext } from './src/common/RequestContext';
import path from 'path';
import loadRouters from './src/services/route';

dotenv.config();

const app = express();
app.use(express.json());
// Swagger Docs
setupSwagger(app);

// Initialize AsyncLocalStorage context for requestId
app.use(requestIdMiddleware);
app.use((req: Request, res: Response, next: NextFunction) => {
    const requestId = RequestContext.get('requestId') || 'N/A';
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api', loadRouters(path.join(__dirname, 'src/services')));

// Error Handler Middleware (MUST be placed after all routes)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
});

export const startServer = async () => {
    try {
        logger.info('Connecting to the database...');
        await AppDataSource.initialize();
        logger.info('Database connected successfully.');

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            logger.info(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        logger.error('Failed to connect to the database. Server not started.');
        logger.error(error.message);
        // process.exit(1); // Exit the process with a failure code
    }
};

startServer()
