import { Module } from '@nestjs/common';
import { EmpresasController } from './controllers/empresas.controller';
import { EmpresasApplicationService } from './application/services/empresas.application.service';
import { EmpresasService } from './domain/services/empresas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './domain/entities/empresa.entity';

@Module({
  controllers: [EmpresasController],
  providers: [EmpresasApplicationService, EmpresasService],
  imports: [TypeOrmModule.forFeature([Empresa])],
})
export class EmpresasModule {}
