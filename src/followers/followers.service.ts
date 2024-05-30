import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { UpdateFollowerDto } from './dto/update-follower.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Follower } from './entities/follower.entity';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FollowersService {
  constructor(
    @InjectRepository(Follower)
    private readonly followerRepository: Repository<Follower>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createRequest(senderId: number, receiverId: number) {
    const sender = await this.userRepository.findOne({ where: { id: senderId } });
    const receiver = await this.userRepository.findOne({ where: { id: receiverId } });

    if (!sender || !receiver) {
      throw new NotFoundException('User not found');
    }

    const followerRequest = this.followerRepository.create({ sender, receiver });
    return this.followerRepository.save(followerRequest);
  }

  async updateRequestStatus(requestId: number, status: string) {
    const validStatuses = ["Accepted", "Rejected"];

    if (!validStatuses.includes(status)) {
      throw new BadRequestException('Invalid status. Status must be "Accepted" or "Rejected"');
    }
    const request = await this.followerRepository.findOne({ where: { id: requestId } });
    if (!request) {
      throw new NotFoundException('Request not found');
    }

    request.status = status;
    return this.followerRepository.save(request);
  }

  async getRequestsForUser(userId: number) {
    return this.followerRepository.find({ where: { receiver: { id: userId } } });
  }
}
