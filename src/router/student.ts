import express from 'express'
import StudentController from '../controller/StudentController'

const router = express.Router()
router.get('/:name', StudentController.getInstance().getStudentByName)
router.get('/', StudentController.getInstance().getAllStudent)
router.post('/', StudentController.getInstance().addNewStudent)
router.delete('/:name', StudentController.getInstance().deleteStudent)
router.delete('/', StudentController.getInstance().deleteAllStudent)
export default router
