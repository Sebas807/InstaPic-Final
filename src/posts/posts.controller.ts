import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(AuthGuard) 
  async uploadImage(@Body('imageUrl') imageUrl: string, @Req() req: any) {
    const userId = req.user.id;
    return this.postsService.uploadImage(imageUrl, userId);
  }

  @Get()
  @UseGuards(AuthGuard) 
  async findOne(@Req() req: any) {
    const userId = req.user.id;
    return this.postsService.findOne(userId);
  }

}
