import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto){
    return this.authService.login(loginDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Request() request: Request) {
    return this.authService.findAll();
  }

  @Get(':name')
  @UseGuards(AuthGuard)
  findOne(@Param('name') name: string) {
    return this.authService.findOne(name);
  }

  @Get('id/:id')
  @UseGuards(AuthGuard)
  findNameById(@Param('id') id: number) {
    return this.authService.findNameById(id);
  }

  @Post('/logout')
  @UseGuards(AuthGuard)
  logout(@Request() request: Request) {
    return this.authService.logout();
  }
   
}
