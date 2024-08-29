import { CanActivate, ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const AUTORIZACAO_KEY = 'autorizacao_key';
export const Autorizacao = (autorizacao: string) => SetMetadata(AUTORIZACAO_KEY, autorizacao);

@Injectable()
export class AutorizacaoGuard implements CanActivate {

  constructor(
    private readonly _reflector: Reflector
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const autorizacao = this._reflector.getAllAndOverride<boolean>(AUTORIZACAO_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!autorizacao) {
      throw new Error('@Autorizacao obrigatorio.')
    }
    const request = context.switchToHttp().getRequest();

    return true
  }

}