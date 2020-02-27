/**********************************/
/*           Users Table          */ 
/**********************************/

import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize';
import { User,  UserRoles } from '@shared/types/User';
import mergeClassWithModel from './mergeClassWithModel';
import { SharedModel } from './SharedModel';

const UserModelOptions = {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pwdHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM(
      UserRoles.Admin,
      UserRoles.Standard,
    ),
    default: UserRoles.Standard,
    allowNull: false
  }
};

class UserModel extends SharedModel {};
interface UserModel extends User {};
mergeClassWithModel(UserModel, User);

UserModel.init(UserModelOptions, {
  sequelize,
  tableName: 'Users'
});

export default UserModel;