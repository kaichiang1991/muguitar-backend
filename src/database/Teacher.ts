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
import sequelize from '.'
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

const getAllTeacher = async (): Promise<Array<Teacher>> => Teacher.findAll()

/**
 * 根據名字取得教師
 * @param {string} name 教師名字
 * @returns {Promise<Teacher>}
 */
const getTeacherByName = async (name: string): Promise<Teacher> => {
  const teacher: Teacher = await Teacher.findOne({ where: { name } }).catch(
    err => err.name
  )
  return teacher
}

/**
 * 新增教師
 * @param {string} name 名字
 * @param {number} salary 薪水
 * @param {string} subjects 科目
 * @returns {Promise<Teacher | string>} 新增成功的教師 / 錯誤訊息
 */
const newTeacher = async (
  name: string,
  salary: number,
  subjects: string
): Promise<Teacher | string> => {
  const newTeacher: Teacher = await Teacher.create({
    name,
    salary,
    subjects,
  }).catch(err => err.name)

  return newTeacher
}

/**
 * 修改教師資料
 * @param {string} name
 * @param {number} [salary=]
 * @param {string} [subjects=]
 * @returns {Promise<Teacher | string} 更改後的教師 ｜ 錯誤訊息
 */
const modifyTeacher = async (
  name: string,
  salary?: number,
  subjects?: string
): Promise<Teacher | string> => {
  const teacher: Teacher = await getTeacherByName(name)

  // 是錯誤訊息
  if (typeof teacher === 'string') {
    return teacher
  }

  return teacher?.update({ salary, subjects })
}

/**
 * 刪除一個教師資料
 * @param {string} name
 * @returns {number} 刪除的數量
 */
const deleteOneTeacher = async (name: string): Promise<number> =>
  Teacher.destroy({ where: { name } })

/** 清除所有教師資料 */
const deleteAllTeacher = async () => Teacher.truncate()

export {
  getAllTeacher,
  getTeacherByName,
  newTeacher,
  modifyTeacher,
  deleteOneTeacher,
  deleteAllTeacher,
}
