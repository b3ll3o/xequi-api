import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Empresa } from '../entities/empresa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmpresasService {
  constructor(
    @InjectRepository(Empresa)
    private readonly empresasRepository: Repository<Empresa>,
  ) {}

  async cadastra(novaEmpresa: Empresa): Promise<Empresa> {
    const empresaCadastrada = await this._buscaEmpresaPorNome(novaEmpresa.nome);
    if (!novaEmpresa.podeSerCadastrada(empresaCadastrada)) {
      return novaEmpresa;
    }
    return this.empresasRepository.save(novaEmpresa);
  }

  async _buscaEmpresaPorNome(nome: string): Promise<null | Empresa> {
    return this.empresasRepository.findOne({ where: { nome } });
  }
}
