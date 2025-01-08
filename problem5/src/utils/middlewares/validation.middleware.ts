import { Request, Response, NextFunction } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CustomError } from '../../common/CustomError';

export const validateRequest = (dtoClass: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dtoInstance = plainToInstance(dtoClass, req.body);
            const errors: ValidationError[] = await validate(dtoInstance, {});

            if (errors.length > 0) {
                throw new CustomError(
                    400,
                    'Validation failed',
                    errors.flatMap((error) => {
                        return Object.values(error.constraints || {}).map((message) => ({
                            field: error.property,
                            message,
                        }));
                    })
                );
            }

            req.body = dtoInstance;
            next();
        } catch (error) {
            next(error); // Forward to error handler middleware
        }
    };
};