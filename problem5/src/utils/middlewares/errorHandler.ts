import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../../common/CustomError';
import { RequestContext } from '../../common/RequestContext';
import { logger } from '../../common/logger';

// Middleware to handle errors globally
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const requestId = RequestContext.get('requestId') || 'N/A';
    // Log full error details
    if (err instanceof CustomError) {
        return res.status(err.code).json({
            status: err.status,
            code: err.code,
            message: err.message,
            details: err.details,
            requestId,
        });
    }

    logger.error('errorHandler', {
        name: err.name,
        message: err.message,
        stack: err.stack,
        details: err instanceof CustomError ? err.details : undefined
    });

    return res.status(500).json({
        status: 'error',
        code: 500,
        message: 'Internal Server Error',
        details: [],
        requestId,
    });
};
