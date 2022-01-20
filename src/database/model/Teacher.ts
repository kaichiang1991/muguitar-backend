/**
 * Keep this file in sync with the code in the "Usage" section in typescript.md
 */
import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  Model,
  ModelDefined,
  Optional,
} from 'sequelize'
import sequelize from '..'
import Student from './Student'

interface TeacherAttr {
  id: number
  name: string
  salary: number
  subjects: string
}

interface TeacherCreationAttr extends Optional<TeacherAttr, 'id'> {}

export default class Teacher
  extends Model<TeacherAttr, TeacherCreationAttr>
  implements TeacherAttr
{
  public id!: number
  public name!: string
  public salary!: number
  public subjects!: string

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public getStudents!: HasManyGetAssociationsMixin<Student> // Note the null assertions!
  public addStudent!: HasManyAddAssociationMixin<Student, number>
  public hasStudent!: HasManyHasAssociationMixin<Student, number>
  public countStudents!: HasManyCountAssociationsMixin
  public createStudent!: HasManyCreateAssociationMixin<Student>
}

export async function initTeacherTable() {
  Teacher.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.STRING(64),
        primaryKey: true,
        unique: true,
      },
      salary: {
        type: DataTypes.INTEGER,
      },
      subjects: {
        type: new DataTypes.STRING(64),
      },
    },
    { tableName: 'Teacher', sequelize }
  )

  // Teacher.hasMany(Student, {
  //   sourceKey: 'id',
  //   foreignKey: 'teacher_id',
  // })

  // const oneTeacher: Teacher = await Teacher.create({
  //   name: 'AA',
  //   salary: 5000,
  //   subjects: '123-456',
  // })

  // const student1: Student = await oneTeacher.createStudent({
  //   name: '學生Ａ',
  // })
  // const student2: Student = await oneTeacher.createStudent({
  //   name: '學生Ｂ',
  // })

  // console.log(
  //   'add',
  //   await oneTeacher.addStudent(student1),
  //   'get',
  //   await oneTeacher.getStudents()
  // )

  // await Teacher.sync()
}
