import { IsString, IsEmail, IsBoolean, IsInt } from 'class-validator';

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

export class PaginationMetaDto {
    @IsInt()
    page: number;

    @IsInt()
    limit: number;

    @IsInt()
    total: number;

    @IsInt()
    pageCount: number;
}