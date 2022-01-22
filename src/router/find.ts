import express from 'express'
import ApiController from '../controller/ApiController'

const router = express.Router()

// 找出教師的課程
router.get(
  '/course/:teacher_id',
  ApiController.getInstance().findCourseByTeacherId
)

export default router
