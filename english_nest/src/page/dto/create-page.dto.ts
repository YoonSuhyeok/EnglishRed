import { IsString } from 'class-validator';

export class CreatePageDto {

    @IsString()
    name: string;

    @IsString()
    userId: string;

}