import { IsString, IsEmail, IsBoolean, IsOptional, MinLength, IsInt, MaxLength, Min, Max, IsNotEmpty } from 'class-validator';
import { IsEmailUnique } from '../../decorators/email-unique.decorator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    fullname: string;

    @IsInt()
    @Min(1)
    @Max(100)
    age: number;

    @IsNotEmpty()
    @IsEmail()
    @IsEmailUnique({ message: 'Email is already registered. Please use a different one.' })
    email: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @MaxLength(50)
    fullname?: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(100)
    age?: number;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}

export class PaginationQueryDto {
    @IsOptional()
    @IsInt()
    @Min(1)
    @Transform(({ value }) => parseInt(value))
    page?: number = 1;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(100)
    @Transform(({ value }) => parseInt(value))
    limit?: number = 10;
}

export class FilterUserDto extends PaginationQueryDto {
    @IsOptional()
    @IsString()
    keyword?: string;
}