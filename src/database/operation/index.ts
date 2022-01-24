import { Model } from 'sequelize'
import CourseOp from './Course'
import StudentOp from './Student'
import TeacherOp from './Teacher'

interface IAllOp {
  teacher: IModelOperator<Model>
  student: IModelOperator<Model>
  course: IModelOperator<Model>
}

interface IModelOperator<T> {
  getAll: { (): Promise<Array<T>> }
  getByName?: { (name: string): Promise<T> }
  getById?: { (id: number): Promise<T> }
  addOne: { (...ctx: Array<any>): Promise<T | string> }
  updateOne: { (...ctx: Array<any>): Promise<T | string> }
  deleteAll: { (): void }
  deleteOne: { (...ctx: Array<any>): Promise<number> }
  [propName: string]: any
}

const allOp: IAllOp = {
  teacher: {
    getAll: TeacherOp.getAll,
    getByName: TeacherOp.getByName,
    getById: TeacherOp.getById,
    addOne: TeacherOp.newOne,
    updateOne: TeacherOp.updateOne,
    deleteAll: TeacherOp.deleteAll,
    deleteOne: TeacherOp.deleteOne,
  },
  student: {
    getAll: StudentOp.getAll,
    getByName: StudentOp.getOne,
    addOne: StudentOp.newOne,
    updateOne: StudentOp.updateOne,
    deleteAll: StudentOp.deleteAll,
    deleteOne: StudentOp.deleteOne,
  },
  course: {
    getAll: CourseOp.getAll,
    getById: CourseOp.getOne,
    addOne: CourseOp.newOne,
    updateOne: CourseOp.updateOne,
    deleteAll: CourseOp.deleteAll,
    deleteOne: CourseOp.deleteOne,
  },
}
export default allOp
