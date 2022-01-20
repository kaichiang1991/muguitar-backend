import { IExpressCallback } from '.'
import BaseController from './BaseController'

export default class ApiController extends BaseController {
  protected static instance: BaseController
  public static getInstance(): BaseController {
    return this.instance || (this.instance = new ApiController())
  }

  // ToDo 顯示所有 api
  public getAll: IExpressCallback = (req, res) => {
    const apiList: { [key: string]: string } = {
      'GET /api': '取得所有 api 列表',
      // teacher
      'GET /api/teacher': '取得所有教師列表',
      'GET /api/teacher/:name': '取得教師資料',
      'POST /api/teacher': '新增教師資料',
      'PATCH /api/teacher': '修改教師資料',
      'DELETE /api/teacher': '刪除全部教師',
      'DELETE /api/teacher/:name': '刪除單一教師',
    }

    res.json(apiList)
  }
}
