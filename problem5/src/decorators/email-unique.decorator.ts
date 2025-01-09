import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { AppDataSource } from '../config/db';
import { User } from '../services/users/user.entity';
import { logger } from '../common/logger';

/**
 * Custom validator to check if an email is unique in the User table.
 */
@ValidatorConstraint({ async: true })
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
    async validate(email: string, args: ValidationArguments): Promise<boolean> {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const existingUser = await userRepository.findOne({ where: { email } });
            return !existingUser; // Return false if the email exists, true otherwise
        } catch (error) {
            logger.error('Error in IsEmailUnique validation:', error);
            return false;
        }
    }

    defaultMessage(args: ValidationArguments): string {
        return `The email "${args.value}" is already in use.`;
    }
}

/**
 * Decorator to validate email uniqueness.
 * @param validationOptions Validation options for error messages.
 */
export function IsEmailUnique(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailUniqueConstraint,
        });
    };
}
