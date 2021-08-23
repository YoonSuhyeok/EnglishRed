import { IsString } from 'class-validator';

export class UpdatePageDto {

    @IsString()
    name: string;

    @IsString()
    newName: string;

}