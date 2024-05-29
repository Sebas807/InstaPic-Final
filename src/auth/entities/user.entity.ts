import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'text',
        unique:true,
    })
    email: string;

    @Column('text')
    name: string;

    @Column('text')
    password: string;

    @Column({default:true})
    isActive: boolean;

}
