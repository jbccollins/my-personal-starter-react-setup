/**********************************/
/*           Users Table          */ 
/**********************************/

import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../sequelize';
import { User as SharedUser, UserRoles } from '@shared/types/User';
import mergeClassWithModel from './mergeClassWithModel';
import { IMergeableModel } from './IMergeableModel';

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
    allowNull: false
  }
};

const extractionFunction = (m: User) => new SharedUser("", "", "", UserRoles.Standard, "");

// class User extends Model implements IMergeableModel<SharedUser> {
//   public extract: extractionFunction;
// };

class User extends Model {};
interface User extends SharedUser {};
mergeClassWithModel(User, SharedUser);

User.init(UserModelOptions, {
  sequelize,
  tableName: 'Users'
});

export default User;