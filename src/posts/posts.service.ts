import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async uploadImage(imageUrl: string, userId: number) {
    if (!this.isValidUrl(imageUrl)) {
      throw new BadRequestException('Invalid URL format');
    }
    
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    const post = this.postRepository.create({ imageURL: imageUrl, user: user });
    return this.postRepository.save(post);
  }

  private isValidUrl(url: string): boolean {
    const urlRegex = /^(https?:\/\/)?([^\s$.?#].[^\s]*)$/i;
    return urlRegex.test(url);
  }

  async findOne(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    return this.postRepository.find({ where: { id: userId } });
  }

}
