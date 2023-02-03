import { INTEGER, STRING, Model } from 'sequelize';
import db from '.';
import User from './User';

class UserSocket extends Model {
  id!: number;
  userSocket!: string;
}

UserSocket.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER
  },
  socket: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'users_sockets',
  timestamps: false
});

UserSocket.belongsTo(User, { foreignKey: 'socket', as: 'user_socket' });

export default UserSocket;