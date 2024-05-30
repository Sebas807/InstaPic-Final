import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { User } from "src/auth/entities/user.entity";
import { Comment } from "src/comments/entities/comment.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    imageURL: string;

    @ManyToOne(() => User, user => user.posts)
    user: User;

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];
    
}
