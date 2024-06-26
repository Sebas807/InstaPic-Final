import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../interfaces/jwt-payload';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService:AuthService
  ){ }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    
    if(!token){
      throw new UnauthorizedException('Token is required');
    }
    let payload:JwtPayload;
    try{
        payload = await this.jwtService.verifyAsync<JwtPayload>(
          token, { secret: process.env.JWT_SECRET }
        );
    }catch(error){
      throw new UnauthorizedException('Invalid token');
    }
    const user = await this.authService.findById(payload.id);
    if(!user || !user.isActive){
      throw new UnauthorizedException('User not exists');
    }
    request.user = user;
    return Promise.resolve(true);
  }

  extractToken(request: Request):string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ')??[];
    return type==='Bearer' ? token : undefined;
  }
}
