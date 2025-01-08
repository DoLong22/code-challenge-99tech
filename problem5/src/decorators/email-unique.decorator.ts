import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { AppDataSource } from '../config/db';
import { User } from '../services/user/user.entity';

/**
 * Custom validator to check if an email is unique in the User table.
 */
@ValidatorConstraint({ async: true })
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
    async validate(email: string, args: ValidationArguments): Promise<boolean> {
        const userRepository = AppDataSource.getRepository(User);
        const existingUser = await userRepository.findOne({ where: { email } });
        return !existingUser; // Return true if no user with this email exists
    }

    defaultMessage(args: ValidationArguments): string {
        return `The email "${args.value}" is already in use. Please use another email.`;
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
