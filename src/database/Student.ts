import { Association, DataTypes, Model, Optional } from 'sequelize'
import sequelize from '.'
import Course from './Course'

interface StudentAttr {
  id: number
  name: string
  courses?: Array<Course>
}

interface StudentCreationAttr extends Optional<StudentAttr, 'id'> {}

export default class Student
  extends Model<StudentAttr, StudentCreationAttr>
  implements StudentAttr
{
  public id!: number
  public name!: string

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
    },
    { tableName: 'Student', sequelize }
  )
}
