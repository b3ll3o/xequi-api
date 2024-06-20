import { ResultadoValidator } from '@/shared/domain/validators/resultado.validator';
import { Injectable } from '@nestjs/common';
import { Autorizacao, Perfil } from '@prisma/client';
import { AutorizacoesRepository } from '../repositories/autorizacoes.repository';
import { PerfisRepository } from '../repositories/perfis.repository';
import { UnicaAutorizacaoCadastradaValidator } from '../validators/unica.autorizacao.cadastrada.validator';
import { UnicoPerfilCadastradoValidator } from '../validators/unico.perfil.cadastrado.validator';

@Injectable()
export class AuthService {
  constructor(
    private readonly autorizacaoRepository: AutorizacoesRepository,
    private readonly perfilRepository: PerfisRepository,
    private readonly unicoPerfilCadastradoValidator: UnicoPerfilCadastradoValidator,
    private readonly unicaAutorizacaoCadastradaValidator: UnicaAutorizacaoCadastradaValidator,
  ) {}

  async criaNovaAutorizacao({
    nome,
  }: Autorizacao): Promise<ResultadoValidator<Autorizacao>> {
    const { resultado, notificacaoErros } =
      await this.unicaAutorizacaoCadastradaValidator.valida({ nome });
    if (notificacaoErros.invalido()) {
      return new ResultadoValidator(notificacaoErros, resultado);
    }
    const autorizacao = await this.autorizacaoRepository.save({ nome });
    return new ResultadoValidator(notificacaoErros, autorizacao);
  }

  async criaNovoPerfil({ nome }: Perfil): Promise<ResultadoValidator<Perfil>> {
    const { resultado, notificacaoErros } =
      await this.unicoPerfilCadastradoValidator.valida({ nome });
    if (notificacaoErros.invalido()) {
      return new ResultadoValidator(notificacaoErros, resultado);
    }
    const perfil = await this.perfilRepository.save({ nome });
    return new ResultadoValidator(notificacaoErros, perfil);
  }
}
