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

      // student
      'GET /api/student': '取得所有學生列表',
      'GET /api/student/:name': '取得學生資料',
      'POST /api/student': '新增學生資料',
      'PATCH /api/student': '修改學生資料',
      'DELETE /api/student': '刪除全部學生',
      'DELETE /api/student/:name': '刪除單一學生',

      // course
      'GET /api/course': '取得所有課程列表',
      'GET /api/course/:name': '取得課程資料',
      'POST /api/course': '新增課程資料',
      'PATCH /api/course': '修改課程資料',
      'DELETE /api/course': '刪除全部課程',
      'DELETE /api/course/:name': '刪除單一課程',
    }

    res.json(apiList)
  }
}
