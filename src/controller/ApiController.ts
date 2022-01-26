import { eErrorCode, IExpressCallback, IResponseData } from '.'
import Course from '../database/model/Course'
import Student from '../database/model/Student'
import Teacher from '../database/model/Teacher'
import BaseController from './BaseController'

export default class ApiController extends BaseController {
  protected static instance: ApiController
  public static getInstance(): ApiController {
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

      // find
      'GET /api/find/course/:param1/:type': '找出相關課程',
    }

    res.json(apiList)
  }

  //#region findCourse
  public findCourse: IExpressCallback = async (req, res) => {
    const { param1, type } = req.params

    switch (type) {
      case 'subject':
        res.json(await this.findCourseBySubject(param1))
        break
      case 'student_id':
        res.json(await this.findCourseByStudentId(Number(param1)))
        break
      case 'teacher_id':
      default:
        res.json(await this.findCourseByTeacherId(Number(param1)))
        break
    }
  }

  public findCourseWithTeacher: IExpressCallback = async (req, res) => {
    const result: Array<Course> = await Course.findAll({
      include: [
        {
          model: Student,
          attributes: ['name'],
          include: [{ model: Teacher, attributes: ['id', 'name'] }],
        },
      ],
    })

    const response: IResponseData = {
      code: eErrorCode.success,
      data: result,
    }

    res.json(response)
  }

  public findCourseByTeacherId = async (
    teacher_id: number
  ): Promise<IResponseData> => {
    const result: Array<Course> = await Course.findAll({
      include: [
        {
          model: Student,
          where: { teacher_id }, // 找出 Student 模型中 teacher_id 相同的 Course
        },
      ],
    })

    const response: IResponseData = {
      code: eErrorCode.success,
      data: result,
    }

    return response
  }

  public findCourseByStudentId = async (
    student_id: number
  ): Promise<IResponseData> => {
    const result: Array<Course> = await Course.findAll({
      where: { student_id },
    })

    const response: IResponseData = {
      code: eErrorCode.success,
      data: result,
    }

    return response
  }

  public findCourseBySubject = async (
    subject: string
  ): Promise<IResponseData> => {
    const result: Array<Course> = await Course.findAll({
      where: { subject },
    })

    const response: IResponseData = {
      code: eErrorCode.success,
      data: result,
    }

    return response
  }

  //#endregion findCourse

  //#region  findStudent
  public findStudent: IExpressCallback = async (req, res) => {
    const { param1, type } = req.params
    switch (type) {
      default:
      case 'teacher_id':
        res.json(await this.findStudentByTeacherId(Number(param1)))
        break
      case 'teacher_name':
        res.json(await this.findStudentByTeacherName(param1))
        break
    }
  }

  public findStudentByTeacherId = async (
    teacher_id: number
  ): Promise<IResponseData> => {
    const result: Array<Student> = await Student.findAll({
      include: [{ model: Teacher, where: { id: teacher_id } }],
    })
    const response: IResponseData = {
      code: eErrorCode.success,
      data: result,
    }
    return response
  }

  public findStudentByTeacherName = async (
    name: string
  ): Promise<IResponseData> => {
    const result: Array<Student> = await Student.findAll({
      include: {
        model: Teacher,
        where: { name },
      },
    })

    const response: IResponseData = {
      code: eErrorCode.success,
      data: result,
    }

    return response
  }
  //#endregion findStudent
}
