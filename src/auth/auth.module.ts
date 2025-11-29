import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt-strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';
import { SessionSerializer } from './session.serializer';

@Module({
  imports:[
    PassportModule.register({session:true}),
    JwtModule.register({
      secret:process.env.JWT_SECRET || 'secretKey',
      signOptions:{expiresIn:'7d'},
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtService,
    SessionSerializer,
  ],
  exports:[JwtService,AuthService]
})
export class AuthModule {}
