import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateTodoDto {
    @IsString()
    @IsNotEmpty()
    title: string; 

    @IsString()
    description?: string;

    @IsBoolean()
    is_done: boolean;
}
