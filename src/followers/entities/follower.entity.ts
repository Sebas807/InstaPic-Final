import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/auth/entities/user.entity";

@Entity()
export class Follower {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, user => user.sentRequests)
    sender: User;
  
    @ManyToOne(() => User, user => user.receivedRequests)
    receiver: User;
  
    @Column({ default: 'pending' })
    status: string;
}
