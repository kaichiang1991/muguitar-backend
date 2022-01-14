import { IExpressCallback } from '.'

export default class TeacherController {
  private static instance: TeacherController
  public static getInstance(): TeacherController {
    return this.instance || (this.instance = new TeacherController())
  }
  private constructor() {}

  getAllTeacher: IExpressCallback = (req, res) => {
    res.send(['000', '001', '002'])
  }
}
