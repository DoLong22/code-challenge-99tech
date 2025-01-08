import { IsString, IsEmail, IsBoolean, IsOptional, MinLength, IsInt, MaxLength, IsIn } from 'class-validator';
import { IsEmailUnique } from '../../decorators/email-unique.decorator';

export class CreateUserDto {
    @IsString()
    @MaxLength(50)
    fullname: string;

    @IsInt()
    age: number;

    @IsEmail()
    @IsEmailUnique({ message: 'Email is already registered. Please use a different one.' })
    email: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    @MaxLength(50)
    fullname?: string;

    @IsInt()
    @IsOptional()
    age?: number;

    @IsEmail()
    @IsOptional()
    @IsEmailUnique({ message: 'Email is already registered. Please use a different one.' })
    email?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
