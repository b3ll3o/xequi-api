import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Empresa } from '../entities/empresa.entity';
import { Repository } from 'typeorm';
import { PerfilUsuarioEmpresaEnum } from '../enums/perfil.usuario.empresa.enum';
import { UsuariosEmpresasService } from './usuarios.empresas.service';

@Injectable()
export class EmpresasService {
  constructor(
    @InjectRepository(Empresa)
    private readonly empresasRepository: Repository<Empresa>,
    private readonly usuariosEmpresasService: UsuariosEmpresasService,
  ) {}

  async cadastra(
    usuarioLogadoId: number,
    novaEmpresa: Empresa,
  ): Promise<Empresa> {
    const empresaCadastrada = await this._buscaEmpresaPorNome(novaEmpresa.nome);
    if (!novaEmpresa.podeSerCadastrada(empresaCadastrada)) {
      return novaEmpresa;
    }
    const empresa = await this.empresasRepository.save(novaEmpresa);
    await this.usuariosEmpresasService.cadastra(
      usuarioLogadoId,
      empresa,
      PerfilUsuarioEmpresaEnum.ADMINISTRADOR,
    );
    return empresa;
  }

  private async _buscaEmpresaPorNome(nome: string): Promise<null | Empresa> {
    return this.empresasRepository.findOne({ where: { nome } });
  }
}
