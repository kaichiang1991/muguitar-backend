import express from 'express'
import TeacherController from '../controller/TeacherController'

const router = express.Router()
router.get('/', TeacherController.getInstance().getAllTeacher)

export default router
