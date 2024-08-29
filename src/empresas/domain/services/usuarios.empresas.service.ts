import { Usuario } from '@/usuarios/domain/entities/usuario.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empresa } from '../entities/empresa.entity';
import { UsuarioEmpresa } from '../entities/usuario.empresa.entity';

@Injectable()
export class UsuariosEmpresasService {
  constructor(
    @InjectRepository(UsuarioEmpresa)
    private readonly usuariosEmpresasRepository: Repository<UsuarioEmpresa>,
  ) { }

  async cadastra(
    usuarioLogadoId: number,
    empresa: Empresa,
  ): Promise<UsuarioEmpresa> {
    return this.usuariosEmpresasRepository.save(
      new UsuarioEmpresa({
        usuario: new Usuario({ id: usuarioLogadoId }),
        empresa,
      }),
    );
  }
}
