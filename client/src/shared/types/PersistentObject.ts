export interface IPersistentObject {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  postConstructor(): void;
}

export abstract class PersistentObject implements IPersistentObject {
  public id?: number;
  public createdAt?: Date;
  public updatedAt?: Date;
  abstract postConstructor(): void;
}