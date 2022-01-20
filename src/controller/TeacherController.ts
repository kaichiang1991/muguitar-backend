import { eErrorCode, IExpressCallback, IResponseData } from '.'
import BaseController from './BaseController'
import allOp from '../database/operation/'
import { Model } from 'sequelize'

const { teacher: Op } = allOp
export default class TeacherController extends BaseController {
  protected static instance: TeacherController
  public static getInstance(): TeacherController {
    return this.instance || (this.instance = new TeacherController())
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
    const response: Model = await Op.getByName!(name)
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
  public addOne: IExpressCallback = async (req, res) => {
    const { name, salary, subjects } = req.body
    const response: Model | string = await Op.addOne(name, salary, subjects)
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
  public updateOne: IExpressCallback = async (req, res) => {
    const { name, salary, subjects } = req.body
    const response: Model | string = await Op.updateOne(name, salary, subjects)
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
  public deleteOne: IExpressCallback = async (req, res) => {
    const { name } = req.params
    const response: number = await Op.deleteOne(name)
    const result: IResponseData = {
      code: response === 0 ? eErrorCode.deleteNoOne : eErrorCode.success,
      data: response,
    }
    res.json(result)
  }

  /** 刪除所有教師資料 */
  public deleteAll: IExpressCallback = async (req, res) => {
    await Op.deleteAll()

    const result: IResponseData = {
      code: eErrorCode.success,
      data: 'delete success',
    }

    res.json(result)
  }
}
