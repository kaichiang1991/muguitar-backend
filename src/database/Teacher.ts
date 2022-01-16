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
  declare id: number // Note that the `null assertion` `!` is required in strict mode.
  declare name: string
  declare salary: number
  declare subjects: string

  // timestamps!
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
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

  await Teacher.sync()
}

const getAllTeacher = async (): Promise<Array<Teacher>> => Teacher.findAll()

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
  const teacher: Teacher = await Teacher.findOne({
    where: { name },
  }).catch(err => err.name)

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
  newTeacher,
  modifyTeacher,
  deleteOneTeacher,
  deleteAllTeacher,
}
