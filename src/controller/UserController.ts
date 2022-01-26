import { Model } from 'sequelize/dist'
import { eErrorCode, IExpressCallback, IResponseData } from '.'
import Teacher from '../database/model/Teacher'
import User from '../database/model/User'
import allOp from '../database/operation'
import BaseController from './BaseController'

const { user: Op } = allOp
export default class UserController extends BaseController {
  protected static instance: UserController
  public static getInstance(): UserController {
    return this.instance || (this.instance = new UserController())
  }

  public getAll: IExpressCallback = async (req, res) => {
    const result: IResponseData = {
      code: eErrorCode.success,
      data: await Op.getAll(),
    }
    res.json(result)
  }

  public getOne: IExpressCallback = async (req, res) => {
    const { account } = req.params
    const response: Model = await Op.getByAccount!(account)
    const result: IResponseData = {
      code: response ? eErrorCode.success : eErrorCode.fail,
      data: response,
    }
    res.json(result)
  }

  public addOne: IExpressCallback = async (req, res) => {
    const { teacher_id, account, password, username } = req.body
    const teacher: Teacher = (await allOp.teacher.getById!(
      teacher_id
    )) as Teacher
    console.log('add user', teacher)
    if (!teacher) {
      res.json({
        code: eErrorCode.notFound,
        data: 'teacher not found',
      })
      return
    }

    const response: Model | string = await Op.addOne(
      teacher_id,
      account,
      password,
      username
    )

    console.log('response', response)
    const result: IResponseData = {
      code: typeof response === 'string' ? eErrorCode.fail : eErrorCode.success,
      data: response,
    }
    res.json(result)
  }

  public updateOne: IExpressCallback = async (req, res) => {
    const { account, password, username } = req.body
    const response: Model | string = await Op.updateOne(
      account,
      password,
      username
    )
    const result: IResponseData = {
      code: typeof response === 'string' ? eErrorCode.fail : eErrorCode.success,
      data: response || 'User not found',
    }
    res.json(result)
  }

  public deleteOne: IExpressCallback = async (req, res) => {
    const { account } = req.params
    const response: number = await Op.deleteOne(account)
    const result: IResponseData = {
      code: response === 0 ? eErrorCode.deleteNoOne : eErrorCode.success,
      data: response,
    }
    res.json(result)
  }

  public deleteAll: IExpressCallback = async (req, res) => {
    await Op.deleteAll()
    const result: IResponseData = {
      code: eErrorCode.success,
      data: 'delete success',
    }

    res.json(result)
  }

  public checkIdentify: IExpressCallback = async (req, res) => {
    const { account, password } = req.params
    const response: User = await User.findOne({
      where: { account, password },
    }).catch(err => err.name)

    const result: IResponseData = {
      code: response ? eErrorCode.success : eErrorCode.userIdentifyFail,
      data: response,
    }

    res.json(result)
  }
}
