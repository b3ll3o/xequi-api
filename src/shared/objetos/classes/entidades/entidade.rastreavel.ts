import {
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Entidade } from './entidade';

export abstract class EntidadeRastreavel<T> extends Entidade<T> {
  @CreateDateColumn()
  dataCriacao: Date;
  @UpdateDateColumn()
  dataAtualizacao: Date;
  @DeleteDateColumn()
  dataDelecao: Date;
  @VersionColumn()
  versao: number;
}
