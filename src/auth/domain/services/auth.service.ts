import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Autorizacao } from '../entities/autorizao.entity';
import { Repository } from 'typeorm';
import { Perfil } from '../entities/perfil.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Autorizacao)
    private readonly autorizacaoRepository: Repository<Autorizacao>,
    @InjectRepository(Perfil)
    private readonly perfilRepository: Repository<Perfil>,
  ) {}

  async criaNovaAutorizao(novaAutorizao: Autorizacao): Promise<Autorizacao> {
    const { nome } = novaAutorizao;
    const autorizacaoCadastrada = await this.autorizacaoRepository.findOne({
      where: { nome },
    });
    if (!novaAutorizao.podeSerCadastrada(autorizacaoCadastrada)) {
      return novaAutorizao;
    }
    this.autorizacaoRepository.save(novaAutorizao);
  }

  
  async criaNovoPerfil(novoPerfil: Perfil): Promise<Perfil> {
    const { nome } = novoPerfil;
    const perfilCadastrado = await this.perfilRepository.findOne({
      where: { nome },
    });
    if (!novoPerfil.podeSerCadastrada(perfilCadastrado)) {
      return novoPerfil;
    }
    this.autorizacaoRepository.save(novoPerfil);
  }
}
