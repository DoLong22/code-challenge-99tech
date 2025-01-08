import { IsString, IsEmail, IsBoolean, IsOptional, MinLength, IsInt, MaxLength, IsIn } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MaxLength(50)
    fullname: string;

    @IsInt()
    age: number;

    @IsEmail()
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
    email?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
