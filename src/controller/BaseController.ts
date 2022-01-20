import { IExpressCallback } from '.'

interface IBaseController {
  getAll: IExpressCallback
  getOne: IExpressCallback
  addOne: IExpressCallback
  updateOne: IExpressCallback
  deleteOne: IExpressCallback
  deleteAll: IExpressCallback
}

export default class BaseController implements IBaseController {
  protected static instance: BaseController
  public static getInstance(): BaseController {
    return this.instance || (this.instance = new BaseController())
  }
  protected constructor() {}

  public getAll!: IExpressCallback
  public getOne!: IExpressCallback
  public addOne!: IExpressCallback
  public updateOne!: IExpressCallback
  public deleteOne!: IExpressCallback
  public deleteAll!: IExpressCallback
}
