import { PersistentObject, IPersistentObject } from '@shared/types/PersistentObject';

export enum UserRoles {
  Standard = "STANDARD",
  Admin = "ADMIN",
}

export type TUserRoles =
  UserRoles.Standard |
  UserRoles.Admin;

export interface IUser extends IPersistentObject {
  firstName: string;
  lastName: string;
  email: string;
  role: TUserRoles;
  pwdHash: string;
}

export class User extends PersistentObject implements IUser {
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public role!: TUserRoles;
  public pwdHash!: string;

  public name() {
    return `${this.firstName} ${this.lastName}`;
  }

  static fromJson(data: User) {
    const user: User = new User(
      data.firstName,
      data.lastName,
      data.email,
      data.role,
      data.pwdHash,
      data.createdAt,
      data.updatedAt,
      data.id,
    );
    return user;
  }

  constructor(
      firstName: string,
      lastName: string,
      email: string,
      role: TUserRoles,
      pwdHash: string,
      createdAt?: Date,
      updatedAt?: Date,
      id?: number,
  ) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role || UserRoles.Standard;
    this.pwdHash = pwdHash;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.id = id;
  }
}
