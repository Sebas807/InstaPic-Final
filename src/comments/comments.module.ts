import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/auth/entities/user.entity';
import { Comment } from "src/comments/entities/comment.entity";

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Comment, User, Post])
  ]
})
export class CommentsModule {}
