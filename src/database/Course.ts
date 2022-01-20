import moment from 'moment'
import { DataTypes, Optional, Model } from 'sequelize'
import sequelize from '.'

interface CourseAttr {
  id: number
  subject: string
  time: moment.Moment
  student_id: number
}

interface CourseCreationAttr extends Optional<CourseAttr, 'id'> {}

export default class Course
  extends Model<CourseAttr, CourseCreationAttr>
  implements CourseAttr
{
  public id!: number
  public subject!: string
  public time!: moment.Moment
  public student_id!: number

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

export async function initCourseTable() {
  Course.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      subject: new DataTypes.STRING(64),
      time: DataTypes.DATE,
      student_id: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
    },
    { tableName: 'Course', sequelize }
  )
}
