import { Module } from '@nestjs/common';
import { EmpresasController } from './controllers/empresas.controller';
import { EmpresasApplicationService } from './application/services/empresas.application.service';
import { EmpresasService } from './domain/services/empresas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './domain/entities/empresa.entity';
import { UsuarioEmpresa } from './domain/entities/usuario.empresa.entity';
import { UsuariosEmpresasService } from './domain/services/usuarios.empresas.service';

@Module({
  controllers: [EmpresasController],
  providers: [
    EmpresasApplicationService,
    EmpresasService,
    UsuariosEmpresasService,
  ],
  imports: [TypeOrmModule.forFeature([Empresa, UsuarioEmpresa])],
})
export class EmpresasModule {}
