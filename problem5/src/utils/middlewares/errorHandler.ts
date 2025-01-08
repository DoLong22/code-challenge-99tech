import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../../common/CustomError';

// Middleware to handle errors globally
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Unhandled Error:', err);
    if (err instanceof CustomError) {
        return res.status(err.code).json({
            status: err.status,
            code: err.code,
            message: err.message,
            details: err.details,
        });
    }


    return res.status(500).json({
        status: 'error',
        code: 500,
        message: 'Internal Server Error',
        details: [],
    });
};
