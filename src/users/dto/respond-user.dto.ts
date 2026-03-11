import { ApiProperty } from '@nestjs/swagger';

export class RespondUserDto {
    @ApiProperty({ example: 1, description: 'The unique identifier of the user' })
    id: number;

    @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
    name: string;

    @ApiProperty({ example: 'john.doe@example.com', description: 'The email address of the user' })
    email: string;

    constructor(user: RespondUserDto){
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
    }
}
