import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class User {
    @ApiProperty({ example: 1, description: 'The unique identifier of the user' })
    @PrimaryGeneratedColumn()
    @Column({
        type: 'varchar',
        nullable: false
    })
    @Generated("uuid")
    id: string;

    @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    name: string;

    @ApiProperty({ example: 'john.doe@example.com', description: 'The email address of the user' })
    @Column({
        type: 'varchar',
        unique: true,
        nullable: false
    })
    // @IsEmail()
    email: string;

    @ApiProperty({ example: 'strongpassword123', description: 'The password of the user' })
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    password: string;

    constructor(user: User) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
    }
}
