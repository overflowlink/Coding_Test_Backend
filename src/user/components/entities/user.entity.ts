import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: "user"})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    name: string
}
