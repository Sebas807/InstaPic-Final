import { Module } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { FollowersController } from './followers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Follower } from './entities/follower.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [FollowersController],
  providers: [FollowersService],
  imports: [
  AuthModule,
  TypeOrmModule.forFeature([Follower, User])
  ]
})
export class FollowersModule {}
