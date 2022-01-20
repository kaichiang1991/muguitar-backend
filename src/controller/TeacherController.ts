import { eErrorCode, IExpressCallback, IResponseData } from '.'
import Teacher, {
  deleteAllTeacher,
  deleteOneTeacher,
  getAllTeacher,
  getTeacherByName,
  modifyTeacher,
  newTeacher,
} from '../database/Teacher'

export default class TeacherController {
  private static instance: TeacherController
  public static getInstance(): TeacherController {
    return this.instance || (this.instance = new TeacherController())
  }
  private constructor() {}

  getAllTeacher: IExpressCallback = async (req, res) => {
    const result: IResponseData = {
      code: eErrorCode.success,
      data: await getAllTeacher(),
    }
    res.json(result)
  }

  getTeacherByName: IExpressCallback = async (req, res) => {
    const { name } = req.params
    const response: Teacher = await getTeacherByName(name)
    const result: IResponseData = {
      code: response ? eErrorCode.success : eErrorCode.fail,
      data: response,
    }
    res.json(result)
  }

  /**
   * 新增教師資料
   * @param {body: {name: string, salary: number, subjects: string}} req
   * @param res
   */
  addNewTeacher: IExpressCallback = async (req, res) => {
    const { name, salary, subjects } = req.body
    const response: Teacher | string = await newTeacher(name, salary, subjects)
    const result: IResponseData = {
      code: typeof response === 'string' ? eErrorCode.fail : eErrorCode.success,
      data: response,
    }
    res.json(result)
  }

  /**
   * 修改教師資料
   * @param {body: {name: string, salary: number, subjects: string}} req
   * @param res
   */
  modifyTeacher: IExpressCallback = async (req, res) => {
    const { name, salary, subjects } = req.body
    const response: Teacher | string = await modifyTeacher(
      name,
      salary,
      subjects
    )
    const result: IResponseData = {
      code: typeof response === 'string' ? eErrorCode.fail : eErrorCode.success,
      data: response || 'Teacher not found',
    }
    res.json(result)
  }

  /**
   * 刪除指定名字的教師資料
   * @param {body: {name: string}} req
   * @param res
   */
  deleteTeacher: IExpressCallback = async (req, res) => {
    const { name } = req.params
    const response = await deleteOneTeacher(name)
    const result: IResponseData = {
      code: response === 0 ? eErrorCode.deleteNoOne : eErrorCode.success,
      data: response,
    }
    res.json(result)
  }

  /** 刪除所有教師資料 */
  deleteAllTeacher: IExpressCallback = async (req, res) => {
    await deleteAllTeacher()

    const result: IResponseData = {
      code: eErrorCode.success,
      data: 'delete success',
    }

    res.json(result)
  }
}
