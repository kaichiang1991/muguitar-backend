import { eErrorCode, IExpressCallback, IResponseData } from '.'
import BaseController from './BaseController'
import allOp from '../database/operation'
import { Model } from 'sequelize'

const { course: Op } = allOp
export default class CourseController extends BaseController {
  protected static instance: CourseController
  public static getInstance(): CourseController {
    return this.instance || (this.instance = new CourseController())
  }

  public getAll: IExpressCallback = async (req, res) => {
    const result: IResponseData = {
      code: eErrorCode.success,
      data: await Op.getAll(),
    }
    res.json(result)
  }

  public getOne: IExpressCallback = async (req, res) => {
    const { id } = req.params
    const response: Model = await Op.getById!(Number(id))
    const result: IResponseData = {
      code: !response
        ? eErrorCode.notFound
        : typeof response === 'string'
        ? eErrorCode.fail
        : eErrorCode.success,
      data: response,
    }
    res.json(result)
  }

  /**
   * 新增一個課程
   * @param {body: {student_name: string, subject: string, time: moment.Moment}} req
   * @param res
   */
  public addOne: IExpressCallback = async (req, res) => {
    const { student_name, subject, time } = req.body
    const response: Model | string = await Op.addOne(
      student_name,
      subject,
      time
    )
    const result: IResponseData = {
      code: typeof response === 'string' ? eErrorCode.fail : eErrorCode.success,
      data: response,
    }
    res.json(result)
  }

  /**
   * 修改課程資料
   * @param {body: {id: number, subject: string, time: moment.Moment, student_id: number}} req
   * @param res
   */
  public updateOne: IExpressCallback = async (req, res) => {
    const { id, subject, time, student_id } = req.body
    const response: Model | string = await Op.updateOne(
      id,
      subject,
      time,
      student_id
    )
    const result: IResponseData = {
      code: typeof response === 'string' ? eErrorCode.fail : eErrorCode.success,
      data: response || 'Course not found',
    }
    res.json(result)
  }

  /**
   * 刪除指定名字的課程資料
   * @param {params: {id: number}} req
   * @param res
   */
  public deleteOne: IExpressCallback = async (req, res) => {
    const { id } = req.params
    const response: number = await Op.deleteOne(Number(id))

    const result: IResponseData = {
      code: !response
        ? eErrorCode.notFound
        : typeof response === 'string'
        ? eErrorCode.fail
        : eErrorCode.success,
      data: response,
    }

    res.json(result)
  }

  /** 刪除所有課程資料 */
  public deleteAll: IExpressCallback = async (req, res) => {
    await Op.deleteAll()
    const result: IResponseData = {
      code: eErrorCode.success,
      data: 'delete success',
    }

    res.json(result)
  }
}
