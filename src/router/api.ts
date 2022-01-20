import express, { Router } from 'express'
import ApiController from '../controller/ApiController'
import teacherRouter from './teacher'
import studentRouter from './student'
import courseRouter from './course'

const router: Router = express.Router()

router.use('/teacher', teacherRouter)
router.use('/student', studentRouter)
router.use('/course', courseRouter)

router.get('/', ApiController.getInstance().getAll)
export default router
