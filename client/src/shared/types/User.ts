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
  fullName: string;
}

const userRoleToEnglish = (role: TUserRoles) => {
  switch (role) {
    case UserRoles.Standard:
      return "unpriviledged";
    case UserRoles.Admin:
      return "admin";
    default:
      throw new Error("Invalid UserRole"); 
  }
}

export class User extends PersistentObject implements IUser {
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public role!: TUserRoles;
  public pwdHash!: string;
  public fullName!: string;

  public getDescription() {
    return `${this.fullName} is an ${userRoleToEnglish(this.role)} user`;
  }

  static fromJSON(data: User) {
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

  postConstructor() {
    this.fullName = `${this.firstName} ${this.lastName}`;
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
    this.role = role;
    this.pwdHash = pwdHash;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.id = id;
    this.postConstructor();
  }
}
