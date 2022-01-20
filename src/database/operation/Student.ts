import allOp from '.'
import sequelize from '..'
import Student from '../model/Student'
import Teacher from '../model/Teacher'

export default class StudentOp {
  static getAll = async (): Promise<Array<Student>> => Student.findAll()

  /**
   * 根據名字取得學生
   * @param {string} name 學生名字
   * @returns {Promise<Teacher>}
   */
  static getOne = async (name: string): Promise<Student> => {
    const student: Student = await Student.findOne({ where: { name } }).catch(
      err => err.name
    )
    return student
  }

  static newOne = async (
    teacher_name: string,
    name: string,
    comment: string
  ): Promise<Student | string> => {
    const teacher: Teacher = (await allOp.teacher.getByName!(
      teacher_name
    )) as Teacher
    if (!teacher) {
      return `can't find teacher.`
    }

    const student: Student = await teacher
      .createStudent({
        name,
        comment,
      })
      .catch(err => err.name)

    return student
  }

  /**
   * 修改學生資料
   * @param {string} name 學生名字
   * @param {string} comment 學生備註
   * @returns {Promsie<string | Student>}
   */
  static updateOne = async (
    name: string,
    comment: string
  ): Promise<string | Student> => {
    const student: Student = await this.getOne(name)
    if (typeof student === 'string') {
      return student
    }

    return student?.update({ comment })
  }

  /**
   * 刪除一個學生資料
   * @param {string} name
   * @returns {number} 刪除的數量
   */
  static deleteOne = async (name: string): Promise<number> =>
    Student.destroy({ where: { name } })

  /** 清除所有學生資料 */
  static deleteAll = async () => {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
    await Student.truncate()
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
  }
}
