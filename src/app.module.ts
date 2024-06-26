import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { FollowersModule } from './followers/followers.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type:'postgres',
      host: process.env.APP_DB_HOST,
      port: +process.env.APP_DB_PORT,
      database: process.env.APP_DB_DATABASE,
      username: process.env.APP_DB_USERNAME,
      password: process.env.APP_DB_PASSWORD,
      autoLoadEntities:true,
      synchronize:true
    }),
    AuthModule,
    FollowersModule,
    PostsModule,
    CommentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
