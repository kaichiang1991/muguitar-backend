import express from 'express'
import ApiController from '../controller/ApiController'

const router = express.Router()

// 找出教師的課程
router.get('/course/:param1/:type', ApiController.getInstance().findCourse)
router.get('/student/:param1/:type', ApiController.getInstance().findStudent)
export default router
