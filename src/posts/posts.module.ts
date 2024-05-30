import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Post } from './entities/post.entity';
import { User } from 'src/auth/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Post, User])
  ]
})
export class PostsModule {}
