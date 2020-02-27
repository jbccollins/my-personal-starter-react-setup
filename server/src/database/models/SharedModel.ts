import { Model, BuildOptions } from 'sequelize';
import { IPersistentObject } from '@shared/types/PersistentObject';

export abstract class SharedModel extends Model implements IPersistentObject{
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  abstract postConstructor(): void;

  constructor(values?: object, options?: BuildOptions) {
    super(values, options);
    this.postConstructor();
  }
}
