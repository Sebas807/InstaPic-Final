import { IsDate, IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    birthday: string;

    @IsString()
    @MinLength(6)
    password: string;
}
