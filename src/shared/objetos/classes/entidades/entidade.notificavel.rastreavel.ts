import {
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { EntidadeNotificavel } from './entidade.notificavel';

export abstract class EntidadeNotificavelRastreavel<
  T,
> extends EntidadeNotificavel<T> {
  @CreateDateColumn()
  dataCriacao?: Date;
  @UpdateDateColumn()
  dataAtualizacao?: Date;
  @DeleteDateColumn()
  dataDelecao?: Date;
  @VersionColumn()
  versao?: number;
}
