import { Model } from 'sequelize'
import StudentOp from './Student'
import TeacherOp from './Teacher'

interface IAllOp {
  teacher: IModelOperator<Model>
  student: IModelOperator<Model>
}

interface IModelOperator<T> {
  getAll: { (): Promise<Array<T>> }
  getByName: { (name: string): Promise<T> }
  addOne: { (...ctx: Array<any>): Promise<T | string> }
  updateOne: { (...ctx: Array<any>): Promise<T | string> }
  deleteAll: { (): void }
  deleteOne: { (...ctx: Array<any>): Promise<number> }
  [propName: string]: any
}

const allOp: IAllOp = {
  teacher: {
    getAll: TeacherOp.getAll,
    getByName: TeacherOp.getOne,
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
}
export default allOp
