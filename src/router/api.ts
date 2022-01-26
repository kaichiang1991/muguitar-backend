import express, { Router } from 'express'
import ApiController from '../controller/ApiController'
import teacherRouter from './teacher'
import studentRouter from './student'
import courseRouter from './course'
import findRouter from './find'
import userRouter from './user'

const router: Router = express.Router()

router.use('/user', userRouter)
router.use('/teacher', teacherRouter)
router.use('/student', studentRouter)
router.use('/course', courseRouter)
router.use('/find', findRouter)

router.get('/', ApiController.getInstance().getAll)
export default router
