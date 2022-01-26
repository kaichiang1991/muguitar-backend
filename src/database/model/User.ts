import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '..'

interface UserAttr {
  id: number
  account: string
  password: string
  username: string
  teacher_id?: number
}

interface UserCreationAttr extends Optional<UserAttr, 'id'> {}

export default class User
  extends Model<UserAttr, UserCreationAttr>
  implements UserAttr
{
  public id!: number
  public account!: string
  public password!: string
  public username!: string
  public teacher_id!: number
}

export async function initUserTable() {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      account: {
        type: new DataTypes.STRING(64),
        unique: true,
        allowNull: false,
      },
      password: {
        type: new DataTypes.STRING(64),
        allowNull: false,
      },
      username: {
        type: new DataTypes.STRING(64),
        allowNull: false,
        unique: true,
      },
      teacher_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        unique: true,
        allowNull: false,
      },
    },
    { tableName: 'User', sequelize }
  )
}
