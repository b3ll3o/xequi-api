import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEmpresa } from '../entities/usuario.empresa.entity';
import { Repository } from 'typeorm';
import { Empresa } from '../entities/empresa.entity';
import { PerfilUsuarioEmpresaEnum } from '../enums/perfil.usuario.empresa.enum';
import { Usuario } from '@/usuarios/domain/entities/usuario.entity';

@Injectable()
export class UsuariosEmpresasService {
  constructor(
    @InjectRepository(UsuarioEmpresa)
    private readonly usuariosEmpresasRepository: Repository<UsuarioEmpresa>,
  ) {}

  async cadastra(
    usuarioLogadoId: number,
    empresa: Empresa,
    perfil: PerfilUsuarioEmpresaEnum,
  ): Promise<UsuarioEmpresa> {
    return this.usuariosEmpresasRepository.save(
      new UsuarioEmpresa({
        usuario: new Usuario({ id: usuarioLogadoId }),
        empresa,
        perfil,
      }),
    );
  }
}
