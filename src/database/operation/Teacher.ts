import Teacher from '../model/Teacher'

export default class TeacherOp {
  static getAll = () => Teacher.findAll()

  /**
   * 根據名字取得教師
   * @param {string} name 教師名字
   * @returns {Promise<Teacher>}
   */
  static getOne = async (name: string): Promise<Teacher> => {
    const teacher: Teacher = await Teacher.findOne({ where: { name } }).catch(
      err => err.name
    )
    return teacher
  }

  // ToDo 看有沒有辦法參數帶 keysof attribute
  /**
   * 新增教師
   * @param {string} name 名字
   * @param {number} salary 薪水
   * @param {string} subjects 科目
   * @returns {Promise<Teacher | string>} 新增成功的教師 / 錯誤訊息
   */
  static newOne = async (
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
  static updateOne = async (
    name: string,
    salary?: number,
    subjects?: string
  ): Promise<Teacher | string> => {
    const teacher: Teacher = await this.getOne(name)

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
  static deleteOne = async (name: string): Promise<number> =>
    Teacher.destroy({ where: { name } })

  /** 清除所有教師資料 */
  static deleteAll = async () => Teacher.truncate()
}
