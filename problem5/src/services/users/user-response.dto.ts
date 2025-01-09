import { IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class UserResponseDto {
    @IsString()
    id: string;

    @IsString()
    fullname: string;

    @IsString()
    age: number;

    @IsEmail()
    email: string;

    @IsBoolean()
    isActive: boolean;
}

