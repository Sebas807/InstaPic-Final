import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { UpdateFollowerDto } from './dto/update-follower.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('followers')
export class FollowersController {
  constructor(private readonly followersService: FollowersService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createRequest(@Body('senderId') senderId: number, @Body('receiverId') receiverId: number) {
    return this.followersService.createRequest(senderId, receiverId);
  }

  @Patch(':requestId')
  @UseGuards(AuthGuard)
  async updateRequestStatus(@Param('requestId') requestId: number, @Body('status') status: string) {
    return this.followersService.updateRequestStatus(requestId, status);
  }

  @Get('user/:userId')
  @UseGuards(AuthGuard)
  async getRequestsForUser(@Param('userId') userId: number) {
    return this.followersService.getRequestsForUser(userId);
  }
}
