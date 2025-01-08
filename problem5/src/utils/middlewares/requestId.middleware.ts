import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { RequestContext } from '../../common/RequestContext';

/**
 * Middleware to generate and attach a UUID to each request using AsyncLocalStorage.
 */
export const requestIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const requestId = uuidv4();

    // Initialize AsyncLocalStorage context
    RequestContext.run(new Map([['requestId', requestId]]), () => {
        next();
    });
};
