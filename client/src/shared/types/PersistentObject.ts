export interface IPersistentObject {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class PersistentObject implements IPersistentObject {
  public id?: number;
  public createdAt?: Date;
  public updatedAt?: Date;
}