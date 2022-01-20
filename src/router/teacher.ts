import express from 'express'
import TeacherController from '../controller/TeacherController'

const router = express.Router()
router.get('/:name', TeacherController.getInstance().getTeacherByName)
router.get('/', TeacherController.getInstance().getAllTeacher)
router.post('/', TeacherController.getInstance().addNewTeacher)
router.patch('/', TeacherController.getInstance().modifyTeacher)
router.delete('/:name', TeacherController.getInstance().deleteTeacher)
router.delete('/', TeacherController.getInstance().deleteAllTeacher)

export default router
