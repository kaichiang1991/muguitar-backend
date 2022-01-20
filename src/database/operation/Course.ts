import moment from 'moment'
import allOp from '.'
import sequelize from '..'
import Course from '../model/Course'
import Student from '../model/Student'

export default class CourseOp {
  static getAll = async (): Promise<Array<Course>> => Course.findAll()

  /**
   * 根據名字取得學生
   * @param {number} id 課程id
   * @returns {Promise<Course>}
   */
  static getOne = async (id: number): Promise<Course> => {
    const course: Course = await Course.findOne({ where: { id } }).catch(
      err => err.name
    )
    return course
  }

  static newOne = async (
    student_name: string,
    subject: string,
    time: moment.Moment
  ): Promise<Course | string> => {
    const student: Student = (await allOp.student.getByName!(
      student_name
    )) as Student

    if (!student) {
      return `can't find student.`
    }

    // ToDo rest client 打不出來，先用假資料
    if (!time) {
      time = moment()
    }

    const course: Course = await Course.create({
      subject,
      time,
      student_id: student.id,
    }).catch(err => err.name)

    return course
  }

  /**
   * 修改學生資料
   * @param {number} id
   * @param {string} subject
   * @param {moment.Moment} time
   * @param {number} student_id
   * @returns
   */
  static updateOne = async (
    id: number,
    subject: string,
    time: moment.Moment,
    student_id: number
  ): Promise<string | Course> => {
    const course: Course = await this.getOne(id)
    if (typeof course === 'string') {
      return course
    }

    return course?.update({ subject, time, student_id })
  }

  /**
   * 刪除一個課程資料
   * @param {number} id
   * @returns {number} 刪除的數量
   */
  static deleteOne = async (id: number): Promise<number> =>
    Course.destroy({ where: { id } }).catch(err => err.name)

  /** 清除所有課程資料 */
  static deleteAll = async () => {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
    await Course.truncate()
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
  }
}
