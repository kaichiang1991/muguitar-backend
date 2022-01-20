import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '.'
import Course from './Course'
import Teacher, { getTeacherByName } from './Teacher'

interface StudentAttr {
  id: number
  name: string
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

const getAllStudent = async (): Promise<Array<Student>> => Student.findAll()

/**
 * 根據名字取得學生
 * @param {string} name 學生名字
 * @returns {Promise<Teacher>}
 */
const getStudentByName = async (name: string) => {
  const student: Student = await Student.findOne({ where: { name } }).catch(
    err => err.name
  )
  return student
}

const newStudent = async (
  teacher_name: string,
  name: string
): Promise<Student | string> => {
  const teacher: Teacher = await getTeacherByName(teacher_name)
  if (!teacher) {
    return `can't find teacher.`
  }

  const student: Student = await teacher
    .createStudent({
      name,
    })
    .catch(err => err.name)

  return student
}

/**
 * 修改學生資料
 * @param {string} name 學生名字
 * @returns {Promsie<string | Student>}
 */
const modifyStudent = async (name: string): Promise<string | Student> => {
  const student: Student = await getStudentByName(name)
  if (typeof student === 'string') {
    return student
  }

  return student?.update({})
}

/**
 * 刪除一個學生資料
 * @param {string} name
 * @returns {number} 刪除的數量
 */
const deleteOneStudent = async (name: string): Promise<number> =>
  Student.destroy({ where: { name } })

/** 清除所有學生資料 */
const deleteAllStudent = async () => {
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
  await Student.truncate()
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
}

export {
  getAllStudent,
  getStudentByName,
  newStudent,
  modifyStudent,
  deleteOneStudent,
  deleteAllStudent,
}
