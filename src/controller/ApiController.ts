import { IExpressCallback } from '.'

export default class ApiController {
  private static instance: ApiController
  public static getInstance(): ApiController {
    return this.instance || (this.instance = new ApiController())
  }
  private constructor() {}

  // ToDo 顯示所有 api
  getAll: IExpressCallback = (req, res) => {
    const apiList: { [key: string]: string } = {
      'GET /api': '取得所有 api 列表',
      // teacher
      'GET /api/teacher': '取得所有教師列表',
      'POST /api/teacher': '新增教師資料',
      'PATCH /api/teacher': '修改教師資料',
    }

    res.json(apiList)
  }
}
