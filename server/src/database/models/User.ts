/**********************************/
/*           Users Table          */ 
/**********************************/

import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../sequelize';
import { User as SharedUser, TUserRoles } from '@shared/types/User';
import applyMixins from './applyMixins';

class User extends Model {};

interface User extends SharedUser {};
applyMixins(User, [SharedUser]);

User.init({
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
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'Users'
});

export default User;