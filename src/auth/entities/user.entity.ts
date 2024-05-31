import { Follower } from "src/followers/entities/follower.entity";
import { Post } from "src/posts/entities/post.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transform } from "class-transformer";

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

    @Transform(({ value }) => new Date(value))
    @Column('date')
    birthday: Date;

    @Column('text')
    password: string;

    @Column({default:true})
    isActive: boolean;

    @OneToMany(() => Follower, request => request.sender)
    sentRequests: Follower[];
  
    @OneToMany(() => Follower, request => request.receiver)
    receivedRequests: Follower[];

    @OneToMany(() => Post, post => post.user)
    posts: Post[];

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[];

}
