import { eErrorCode, IExpressCallback, IResponseData } from '.'
import BaseController from './BaseController'
import allOp from '../database/operation'
import { Model } from 'sequelize'

const { student: Op } = allOp
export default class StudentController extends BaseController {
  protected static instance: StudentController
  public static getInstance(): StudentController {
    return this.instance || (this.instance = new StudentController())
  }

  public getAll: IExpressCallback = async (req, res) => {
    const result: IResponseData = {
      code: eErrorCode.success,
      data: await Op.getAll(),
    }
    res.json(result)
  }

  public getOne: IExpressCallback = async (req, res) => {
    const { name } = req.params
    const response: Model = await Op.getByName(name)
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
  public addOne: IExpressCallback = async (req, res) => {
    const { name, teacher_name } = req.body
    const response: Model | string = await Op.addOne(teacher_name, name)
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
  public deleteOne: IExpressCallback = async (req, res) => {
    const { name } = req.params
    const response: number = await Op.deleteOne(name)
    const result: IResponseData = {
      code: response === 0 ? eErrorCode.deleteNoOne : eErrorCode.success,
      data: response,
    }
    res.json(result)
  }

  /** 刪除所有學生資料 */
  public deleteAll: IExpressCallback = async (req, res) => {
    await Op.deleteAll()
    const result: IResponseData = {
      code: eErrorCode.success,
      data: 'delete success',
    }

    res.json(result)
  }
}
