import { IExpressCallback } from '.'

export default class ApiController {
  private static instance: ApiController
  public static getInstance(): ApiController {
    return this.instance || (this.instance = new ApiController())
  }
  private constructor() {}

  getAll: IExpressCallback = (req, res) => {
    console.log('body', req.body)
    res.send('sucess')
  }
}
