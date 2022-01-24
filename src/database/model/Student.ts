import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '..'

interface StudentAttr {
  id: number
  name: string
  comment: string
  teacher_id?: number
}

interface StudentCreationAttr extends Optional<StudentAttr, 'id'> {}

export default class Student
  extends Model<StudentAttr, StudentCreationAttr>
  implements StudentAttr
{
  public id!: number
  public name!: string
  public comment!: string
  public teacher_id!: number

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

export async function initStudentTable() {
  Student.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: new DataTypes.STRING(64),
      comment: {
        type: new DataTypes.STRING(255),
        allowNull: true,
      },
      teacher_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    { tableName: 'Student', sequelize }
  )
}
