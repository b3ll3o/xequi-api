import { UsuariosModule } from '@/usuarios/usuarios.module';
import { Module } from '@nestjs/common';
import { AuthApplicationService } from './application/services/auth.application.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './application/constantes/constantes';
import { AuthService } from './domain/services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Autorizacao } from './domain/entities/autorizao.entity';
import { Perfil } from './domain/entities/perfil.entity';

@Module({
  imports: [
    UsuariosModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
    TypeOrmModule.forFeature([Autorizacao, Perfil]),
  ],
  providers: [AuthApplicationService, AuthService],
  controllers: [AuthController],
  exports: [AuthApplicationService],
})
export class AuthModule {}
