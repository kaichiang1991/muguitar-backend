import { eErrorCode, IExpressCallback, IResponseData } from '.'
import Student, {
  deleteAllStudent,
  deleteOneStudent,
  getAllStudent,
  getStudentByName,
  newStudent,
} from '../database/Student'

export default class StudentController {
  private static instance: StudentController
  public static getInstance(): StudentController {
    return this.instance || (this.instance = new StudentController())
  }
  private constructor() {}

  getAllStudent: IExpressCallback = async (req, res) => {
    const result: IResponseData = {
      code: eErrorCode.success,
      data: await getAllStudent(),
    }
    res.json(result)
  }

  getStudentByName: IExpressCallback = async (req, res) => {
    const { name } = req.params
    const response: Student = await getStudentByName(name)
    const result: IResponseData = {
      code: response ? eErrorCode.success : eErrorCode.fail,
      data: response,
    }
    res.json(result)
  }

  /**
   * 新增一個學生
   * @param {body: {name: string, teacher_name: string}} req
   * @param res
   */
  addNewStudent: IExpressCallback = async (req, res) => {
    const { name, teacher_name } = req.body
    const response: Student | string = await newStudent(teacher_name, name)
    const result: IResponseData = {
      code: typeof response === 'string' ? eErrorCode.fail : eErrorCode.success,
      data: response,
    }
    res.json(result)
  }

  /**
   * 刪除指定名字的學生資料
   * @param {body: {name: string}} req
   * @param res
   */
  deleteStudent: IExpressCallback = async (req, res) => {
    const { name } = req.params
    const response = await deleteOneStudent(name)
    const result: IResponseData = {
      code: response === 0 ? eErrorCode.deleteNoOne : eErrorCode.success,
      data: response,
    }
    res.json(result)
  }

  /** 刪除所有學生資料 */
  deleteAllStudent: IExpressCallback = async (req, res) => {
    await deleteAllStudent()
    const result: IResponseData = {
      code: eErrorCode.success,
      data: 'delete success',
    }

    res.json(result)
  }
}
