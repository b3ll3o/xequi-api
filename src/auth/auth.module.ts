import { UsuariosModule } from '@/usuarios/usuarios.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './application/constantes/constantes';
import { AuthApplicationService } from './application/services/auth.application.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './domain/services/auth.service';

@Module({
  imports: [
    UsuariosModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AuthApplicationService, AuthService],
  controllers: [AuthController],
  exports: [AuthApplicationService],
})
export class AuthModule {}
