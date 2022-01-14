import express, { NextFunction, Response, Router } from 'express'
import ApiController from '../controller/ApiController'
import teacherRouter from './teacher'
const router: Router = express.Router()

router.use('/teacher', teacherRouter)
router.get('/', ApiController.getInstance().getAll)
router.post('/', ApiController.getInstance().getAll)

export default router
