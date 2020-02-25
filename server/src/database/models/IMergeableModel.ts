import { Model } from 'sequelize/types';

export interface IMergeableModel<T> {
  extract: (m: Model) => T;
}