import { IsString } from 'class-validator';

export class CreateWordDto {

    @IsString()
    pageName: string;

    @IsString()
    top: string;

    @IsString()
    bottom: string;

    @IsString()
    userId: string;

}