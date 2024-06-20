import { PrismaService } from '@/prisma.service';
import { Module } from '@nestjs/common';
import { UsuariosApplicationService } from './application/services/usuarios.application.service';
import { UsuariosController } from './controllers/usuarios.controller';
import { UsuariosRepository } from './domain/repositories/usuarios.repository';
import { UsuariosService } from './domain/services/usuarios.service';
import { UnicoUsuarioValidator } from './domain/validators/unico.usuario.validator';

@Module({
  controllers: [UsuariosController],
  providers: [
    UsuariosService,
    UsuariosRepository,
    UsuariosApplicationService,
    UnicoUsuarioValidator,
    PrismaService,
  ],
  imports: [],
})
export class UsuariosModule {}
