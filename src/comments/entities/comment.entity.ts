import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/auth/entities/user.entity";
import { Post } from "src/posts/entities/post.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.comments)
    user: User;

    @ManyToOne(() => Post, post => post.comments)
    post: Post;

    @Column('text')
    comment: string;
}
